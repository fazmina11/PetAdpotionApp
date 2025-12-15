import React, { useState, useEffect } from 'react';
import { Heart, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { favoritesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PetCard = ({ pet, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user && pet._id) {
      checkFavoriteStatus();
    }
  }, [pet._id, user]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await favoritesAPI.checkFavorite(pet._id);
      setIsFavorite(response.isFavorite);
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please login to add favorites');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await favoritesAPI.toggleFavorite(pet._id);
      setIsFavorite(response.isFavorite);
      
      if (onToggleFavorite) {
        onToggleFavorite();
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/pet/${pet._id}`);
  };

  const getStatusBadge = (status) => {
    const badges = {
      available: { bg: 'bg-green-500', label: 'Available' },
      pending: { bg: 'bg-yellow-500', label: 'Pending' },
      adopted: { bg: 'bg-gray-500', label: 'Adopted' }
    };

    const badge = badges[status] || badges.available;

    return (
      <span className={`absolute top-3 left-3 px-3 py-1 ${badge.bg} text-white rounded-full text-xs font-semibold shadow-lg`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl shadow-md w-full"
    >
      <div className={`relative w-full aspect-square overflow-hidden ${
        pet.bgColor === 'purple' 
          ? 'bg-gradient-to-br from-purple-200 to-purple-300' 
          : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
      }`}>
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        {getStatusBadge(pet.status)}
        <button 
          onClick={handleFavoriteClick}
          disabled={loading}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg disabled:opacity-50 ${
            isFavorite ? 'bg-red-500' : 'bg-white'
          }`}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <Heart 
              size={18} 
              fill={isFavorite ? 'white' : 'none'} 
              className={isFavorite ? 'text-white' : 'text-red-500'}
            />
          )}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{pet.name}</h3>
            <p className="text-sm text-gray-600">{pet.breed}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary-600">${pet.price}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
          <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center">
            <UserIcon size={14} className="text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500">Posted by</p>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {pet.owner?.name || 'Anonymous'}
            </p>
          </div>
        </div>

        <div className="mt-3 flex gap-2 text-xs">
          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
            {pet.gender}
          </span>
          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
            {pet.age}
          </span>
          <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full truncate">
            {pet.location}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;