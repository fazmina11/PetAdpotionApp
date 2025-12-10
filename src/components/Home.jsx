import React, { useState } from 'react';
import { Search, Grid, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PetCard from './PetCard';
import Navbar from './Navbar';
import AddPetModal from './AddPetModal';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('dogs');
  const [activeNav, setActiveNav] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const categories = [
    { id: 'dogs', name: 'Dogs', icon: '🐶' },
    { id: 'cats', name: 'Cats', icon: '🐱' },
    { id: 'birds', name: 'Birds', icon: '🦜' },
    { id: 'rabbits', name: 'Rabbits', icon: '🐰' },
    { id: 'hamsters', name: 'Hamsters', icon: '🐹' },
    { id: 'fish', name: 'Fish', icon: '🐠' },
    { id: 'turtles', name: 'Turtles', icon: '🐢' },
    { id: 'guinea-pigs', name: 'Guinea Pigs', icon: '🐹' }
  ];

  const allPets = [
    {
      id: 1,
      name: 'Brook',
      distance: '1.2 Km Away',
      image: 'https://www.eventstodayz.com/wp-content/uploads/2016/12/cutest-pet-puppy-dog-image.jpg',
      category: 'dogs',
      isFavorite: true,
      bgColor: 'yellow'
    },
    {
      id: 2,
      name: 'Shelly',
      distance: '1.2 Km Away',
      image: 'https://dogbreedersguide.com/wp-content/uploads/2014/12/best-hypoallergenic-dog.jpg',
      category: 'dogs',
      isFavorite: false,
      bgColor: 'purple'
    },
    {
      id: 3,
      name: 'Max',
      distance: '2.5 Km Away',
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop',
      category: 'dogs',
      isFavorite: false,
      bgColor: 'yellow'
    },
    {
      id: 4,
      name: 'Luna',
      distance: '0.8 Km Away',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
      category: 'dogs',
      isFavorite: true,
      bgColor: 'purple'
    },
    {
      id: 5,
      name: 'Whiskers',
      distance: '1.5 Km Away',
      image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop',
      category: 'cats',
      isFavorite: false,
      bgColor: 'yellow'
    },
    {
      id: 6,
      name: 'Mittens',
      distance: '2.0 Km Away',
      image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=400&fit=crop',
      category: 'cats',
      isFavorite: true,
      bgColor: 'purple'
    },
    {
      id: 7,
      name: 'Tweety',
      distance: '3.2 Km Away',
      image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&h=400&fit=crop',
      category: 'birds',
      isFavorite: false,
      bgColor: 'yellow'
    },
    {
      id: 8,
      name: 'Polly',
      distance: '1.8 Km Away',
      image: 'https://images.unsplash.com/photo-1611689037241-d8dfe4280f2e?w=400&h=400&fit=crop',
      category: 'birds',
      isFavorite: false,
      bgColor: 'purple'
    },
    {
      id: 9,
      name: 'Thumper',
      distance: '2.3 Km Away',
      image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
      category: 'rabbits',
      isFavorite: true,
      bgColor: 'yellow'
    },
    {
      id: 10,
      name: 'Nibbles',
      distance: '1.0 Km Away',
      image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=400&fit=crop',
      category: 'hamsters',
      isFavorite: false,
      bgColor: 'purple'
    }
  ];

  const filteredPets = allPets.filter(pet => pet.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-secondary p-4 md:p-10 flex justify-center">
      <div className="bg-white rounded-3xl p-6 md:p-10 max-w-7xl w-full shadow-2xl min-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
              <Grid size={24} className="text-gray-600" />
            </div>
            <div>
              <h2 className="text-base text-gray-500 font-medium">Hello,</h2>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
                {user?.name || 'Guest'} 👋
              </h1>
            </div>
          </div>

          <div className="relative">
            <div 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-3 border-primary-500 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} 
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            {showUserMenu && (
              <div className="absolute top-16 right-0 bg-white rounded-xl shadow-2xl min-w-[180px] overflow-hidden z-50">
                <div 
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate('/profile')}
                >
                  <User size={18} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Profile</span>
                </div>
                <div 
                  className="flex items-center gap-3 px-5 py-3.5 hover:bg-red-50 cursor-pointer transition-colors border-t border-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="text-red-500" />
                  <span className="text-sm font-medium text-red-500">Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl">
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for pets..."
            className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all text-base"
          />
        </div>

        {/* Donation Banner */}
        <div className="bg-gradient-purple rounded-3xl p-6 md:p-8 mb-10 flex justify-between items-center relative overflow-hidden">
          <div>
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Street pets need<br />our protection
            </h3>
            <button 
              onClick={() => setShowAddPetModal(true)}
              className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Donate Now
            </button>
          </div>
          <div className="hidden md:block w-32 h-32 absolute right-8 bottom-0">
            <img 
              src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=200&h=200&fit=crop" 
              alt="Pet"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Categories</h2>
            <span className="text-primary-600 font-semibold cursor-pointer hover:text-primary-700 transition-colors">
              Explore All
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-3 custom-scrollbar">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="text-base">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
          {filteredPets.length > 0 ? (
            filteredPets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-400 text-lg">No pets available in this category yet.</p>
            </div>
          )}
        </div>

        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      </div>

      {/* Add Pet Modal */}
      <AddPetModal 
        isOpen={showAddPetModal} 
        onClose={() => setShowAddPetModal(false)} 
      />
    </div>
  );
};

export default Home;