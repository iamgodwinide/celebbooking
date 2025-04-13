import ServiceComponent from "./ServiceComponent";

export default function BookingPage({ params }: { params: { id: string } }) {
  return <ServiceComponent params={params}/>
}
