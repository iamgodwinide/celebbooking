'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaHandshake, FaIdCard, FaHandHoldingHeart, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';

type Service = {
  id: string;
  name: string;
  description: string;
  icon: any;
  gradient: string;
};

const services: Service[] = [
  {
    id: 'meet-greet',
    name: 'Meet & Greet',
    description: 'Personal one-on-one meeting with photo opportunities and autograph session.',
    icon: FaHandshake,
    gradient: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'vip-card',
    name: 'VIP Fan Card',
    description: 'Exclusive membership card with priority access to events and special content.',
    icon: FaIdCard,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'donate',
    name: 'Donate',
    description: 'Support charitable causes through your favorite celebrity.',
    icon: FaHandHoldingHeart,
    gradient: 'from-pink-500 to-rose-500'
  }
];


const ServiceComponent = ({ params }: { params :{id: string }}) => {
  // Mock celebrity data (in a real app, this would come from an API)
  const celebrity = {
    id: 'john-legend',
    name: 'John Doe',
    category: 'Actor & Singer',
    rating: 4.9,
    reviews: 128,
    image: '/celebrities/john-doe.jpg',
    bio: 'Award-winning actor and platinum-selling recording artist with over 15 years of experience in entertainment.',
    socialMedia: {
      instagram: '@johndoe',
      twitter: '@johndoe',
      tiktok: '@johndoe'
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10" />
        <Image
          src={celebrity.image}
          alt={celebrity.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Celebrity Info */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12">

              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">{celebrity.name}</h1>
                  <p className="text-purple-400 mb-4">{celebrity.category}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 w-5 h-5" />
                      <span className="text-white ml-1">{celebrity.rating}</span>
                    </div>
                    <span className="text-gray-400">({celebrity.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  {Object.entries(celebrity.socialMedia).map(([platform, handle]) => {
                    let SocialIcon;
                    switch(platform) {
                      case 'instagram':
                        SocialIcon = FaInstagram;
                        break;
                      case 'twitter':
                        SocialIcon = FaTwitter;
                        break;
                      case 'tiktok':
                        SocialIcon = FaTiktok;
                        break;
                      default:
                        return null;
                    }
                    return (
                      <a
                        key={platform}
                        href={`https://${platform}.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                      >
                        <SocialIcon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <p className="text-gray-300 mb-12">{celebrity.bio}</p>

              {/* Available Services */}
              <h2 className="text-2xl font-bold text-white mb-8">Choose Your Option</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.id}
                      href={`/booking/${params.id}/apply/${service.id}`}
                      className="group p-8 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} mb-6 w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:text-transparent group-hover:bg-clip-text">
                        {service.name}
                      </h3>
                      <p className="text-gray-400">{service.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
        </div>
      </div>
  );
}

export default ServiceComponent