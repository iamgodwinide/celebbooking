import { connectDb } from "@/config";
import Booking from "@/models/Booking";
import Celebrity from "@/models/Celebrity";
import { sendBookingConfirmation } from "@/lib/emails";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const search = searchParams.get('search');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');

        await connectDb();

        // Build query
        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { customerName: { $regex: search, $options: 'i' } },
                { customerEmail: { $regex: search, $options: 'i' } }
            ];
        }

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        // Count total documents
        const total = await Booking.countDocuments(query);

        // Execute query with pagination
        const bookings = await Booking.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        // Manually populate celebrity data
        const populatedBookings = await Promise.all(bookings.map(async (booking) => {
            const bookingObj = booking.toObject();
            if (bookingObj.celebrityId) {
                const celebrity = await Celebrity.findById(bookingObj.celebrityId).select('name imageUrl profession');
                bookingObj.celebrity = celebrity;
            }
            return bookingObj;
        }));

        return NextResponse.json({
            bookings: populatedBookings,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error("Bookings list error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch bookings" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await connectDb();

        // Create booking
        const booking = await Booking.create(body);

        // Get celebrity details for email
        const celebrity = await Celebrity.findById(booking.celebrityId);
        if (!celebrity) {
            throw new Error('Celebrity not found');
        }

        // Send confirmation email
        try {
            await sendBookingConfirmation({
                booking: booking.toObject(),
                celebrity: {
                    name: celebrity.name,
                    profession: celebrity.profession
                }
            });
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            // Don't throw error here, we still want to return the booking
        }

        // Return response
        return NextResponse.json({
            message: 'Booking created successfully',
            booking: await Booking.findById(booking._id).populate('celebrityId', 'name imageUrl profession')
        }, { status: 201 });
    } catch (error: any) {
        console.error("Booking creation error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to create booking" },
            { status: 400 }
        );
    }
}
