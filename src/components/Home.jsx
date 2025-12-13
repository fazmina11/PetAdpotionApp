import React, { useState, useEffect } from 'react';
import { Search, Grid, LogOut, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { petsAPI } from '../services/api';
import PetCard from './PetCard';
import Navbar from './Navbar';
import AddPetModal from './AddPetModal';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('dogs');
  const [activeNav, setActiveNav] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchPets();
  }, [activeCategory]);

  const fetchPets = async () => {
    setLoading(true);
    try {
      const response = await petsAPI.getAllPets(activeCategory);
      setPets(response.pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      fetchPets();
      return;
    }

    try {
      const response = await petsAPI.searchPets(term);
      setPets(response.pets);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <div className="text-3xl">🐾</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PetAdopt</h1>
                <p className="text-sm text-gray-500">Find your companion</p>
              </div>
            </div>

            {/* User Menu */}
            <div className="relative">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-4 py-2 rounded-xl transition"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{user?.name || 'Guest'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop'} 
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {showUserMenu && (
                <div className="absolute top-14 right-0 bg-white rounded-xl shadow-2xl min-w-[200px] overflow-hidden border">
                  <div 
                    className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                  >
                    <User size={18} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">My Profile</span>
                  </div>
                  <div 
                    className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 cursor-pointer transition border-t"
                    onClick={handleLogout}
                  >
                    <LogOut size={18} className="text-red-500" />
                    <span className="text-sm font-medium text-red-500">Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search + Donate */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search pets by name, breed, or description..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition text-base"
              />
            </div>
          </div>

          {/* Donate Button */}
          <button 
            onClick={() => setShowAddPetModal(true)}
            className="bg-gradient-purple text-white px-8 py-4 rounded-2xl font-semibold hover:opacity-90 transition shadow-lg text-lg"
          >
            + Add Pet for Adoption
          </button>
        </div>

        {/* Categories */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="flex gap-3 overflow-x-auto pb-3">
            {categories.map(category => (
              <button 
                key={category.id}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-semibold whitespace-nowrap transition ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-base">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Pets Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 text-lg">Loading pets...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Available Pets ({pets.length})
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
              {pets.length > 0 ? (
                pets.map(pet => (
                  <PetCard key={pet._id} pet={pet} onToggleFavorite={fetchPets} />
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <p className="text-gray-400 text-xl">
                    {searchTerm ? 'No pets found matching your search.' : 'No pets available in this category yet.'}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      
      <AddPetModal 
        isOpen={showAddPetModal} 
        onClose={() => setShowAddPetModal(false)}
        onPetAdded={fetchPets}
      />
    </div>
  );
};

export default Home;