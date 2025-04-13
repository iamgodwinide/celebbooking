'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaSearch, FaFilter } from 'react-icons/fa';

type Celebrity = {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviews: number;
  availability: 'Available' | 'Limited' | 'Booked';
  price: number;
  tags: string[];
};

const celebrities: Celebrity[] = [
  {
    id: 'john-legend',
    name: 'John Legend',
    category: 'Music',
    imageUrl: '/celebrities/john-legend.jpg',
    rating: 4.9,
    reviews: 128,
    availability: 'Available',
    price: 5000,
    tags: ['Singer', 'Piano', 'R&B', 'Soul']
  },
  {
    id: 'emma-watson',
    name: 'Emma Watson',
    category: 'Acting',
    imageUrl: '/celebrities/emma-watson.jpg',
    rating: 4.8,
    reviews: 156,
    availability: 'Limited',
    price: 8000,
    tags: ['Actor', 'Activist', 'Fashion']
  },
  {
    id: 'gordon-ramsay',
    name: 'Gordon Ramsay',
    category: 'Culinary',
    imageUrl: '/celebrities/gordon-ramsay.jpg',
    rating: 4.7,
    reviews: 203,
    availability: 'Available',
    price: 10000,
    tags: ['Chef', 'TV Host', 'Restaurateur']
  },
  {
    id: 'serena-williams',
    name: 'Serena Williams',
    category: 'Sports',
    imageUrl: '/celebrities/serena-williams.jpg',
    rating: 4.9,
    reviews: 189,
    availability: 'Booked',
    price: 15000,
    tags: ['Tennis', 'Athlete', 'Entrepreneur']
  }
];

const categories = ['All', 'Music', 'Acting', 'Sports', 'Culinary'];
const availabilityOptions = ['All', 'Available', 'Limited', 'Booked'];
const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: '$1,000 - $5,000', min: 1000, max: 5000 },
  { label: '$5,000 - $10,000', min: 5000, max: 10000 },
  { label: '$10,000+', min: 10000, max: Infinity }
];

export default function CelebritiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedAvailability, setSelectedAvailability] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredCelebrities = celebrities.filter(celebrity => {
    const matchesSearch = celebrity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      celebrity.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || celebrity.category === selectedCategory;
    const matchesAvailability = selectedAvailability === 'All' || celebrity.availability === selectedAvailability;
    const matchesPriceRange = celebrity.price >= selectedPriceRange.min && celebrity.price <= selectedPriceRange.max;

    return matchesSearch && matchesCategory && matchesAvailability && matchesPriceRange;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Celebrities</h1>
          <p className="text-xl text-gray-400">
            Book exclusive experiences with your favorite celebrities
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search celebrities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto px-6 py-3 bg-white/5 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <FaFilter />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white/5 rounded-lg">
              {/* Category Filter */}
              <div>
                <label className="block text-white mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category} className="bg-gray-900">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-white mb-2">Availability</label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {availabilityOptions.map((option) => (
                    <option key={option} value={option} className="bg-gray-900">
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-white mb-2">Price Range</label>
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => setSelectedPriceRange(priceRanges.find(range => range.label === e.target.value)!)}
                  className="w-full px-4 py-2 bg-white/5 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {priceRanges.map((range) => (
                    <option key={range.label} value={range.label} className="bg-gray-900">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Celebrity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCelebrities.map((celebrity) => (
            <div key={celebrity.id} className="group relative">
              {/* Celebrity Card */}
              <div className="bg-white/5 rounded-xl overflow-hidden">
                {/* Image */}
                <div className="relative h-80">
                  <Image
                    src={celebrity.imageUrl}
                    alt={celebrity.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Availability Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                    celebrity.availability === 'Available'
                      ? 'bg-green-500/20 text-green-400'
                      : celebrity.availability === 'Limited'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {celebrity.availability}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{celebrity.name}</h3>
                      <p className="text-gray-400">{celebrity.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-gray-400">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{celebrity.rating}</span>
                        <span className="mx-1">·</span>
                        <span>{celebrity.reviews} reviews</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {celebrity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 rounded-full text-sm text-gray-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Book Now Button */}
                  <Link
                    href={`/booking/${celebrity.id}`}
                    className="block w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-center font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCelebrities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">No celebrities found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
