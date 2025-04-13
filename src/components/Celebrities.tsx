'use client';

import Image from 'next/image';
import Link from 'next/link';

type Celebrity = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  availability: 'Available' | 'Limited' | 'Booked';
};

const celebrities: Celebrity[] = [
  {
    id: "john-legend",
    name: "John Legend",
    category: "Music",
    imageUrl: "/celebrities/john-legend.jpg",
    availability: "Available"
  },
  {
    id: "emma-watson",
    name: "Emma Watson",
    category: "Acting",
    imageUrl: "/celebrities/emma-watson.jpg",
    availability: "Limited"
  },
  {
    id: "gordon-ramsay",
    name: "Gordon Ramsay",
    category: "Culinary",
    imageUrl: "/celebrities/gordon-ramsay.jpg",
    availability: "Available"
  },
  {
    id: "serena-williams",
    name: "Serena Williams",
    category: "Sports",
    imageUrl: "/celebrities/serena-williams.jpg",
    availability: "Booked"
  }
];

const Celebrities = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 opacity-0 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Celebrities
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Book world-class talent for your next event
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {celebrities.map((celebrity, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden opacity-0 animate-fade-in-delay-2"
            >
              <div className="aspect-w-3 aspect-h-4 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                <Image
                  src={celebrity.imageUrl}
                  alt={celebrity.name}
                  width={200}
                  height={200}
                  className="object-contain w-full h-full bg-no-repeat group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-400">
                    {celebrity.category}
                  </p>
                  <h3 className="text-xl font-bold text-white">
                    {celebrity.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${celebrity.availability === 'Available' ? 'bg-green-500/20 text-green-400' : 
                        celebrity.availability === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'}`}
                    >
                      {celebrity.availability}
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link 
                    href={`/booking/${celebrity.id}`}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center opacity-0 animate-fade-in-delay-4">
          <Link 
            href="/celebrities"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            View All Celebrities
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Celebrities;