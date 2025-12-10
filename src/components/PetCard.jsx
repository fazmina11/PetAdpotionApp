import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PetCard = ({ pet }) => {
  const [isFavorite, setIsFavorite] = useState(pet.isFavorite);
  const navigate = useNavigate();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-3xl overflow-hidden cursor-pointer transition-all hover:-translate-y-2 hover:shadow-2xl shadow-lg"
    >
      <div className={`relative w-full h-56 flex items-end justify-center overflow-hidden ${
        pet.bgColor === 'purple' 
          ? 'bg-gradient-to-br from-purple-200 to-purple-300' 
          : 'bg-gradient-to-br from-yellow-100 to-yellow-200'
      }`}>
        <img 
          src={pet.image} 
          alt={pet.name}
          className="w-full h-full object-cover"
        />
        <div 
          onClick={handleFavoriteClick}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 shadow-lg ${
            isFavorite ? 'bg-red-500' : 'bg-white'
          }`}
        >
          <Heart 
            size={18} 
            fill={isFavorite ? 'white' : 'none'} 
            className={isFavorite ? 'text-white' : 'text-red-500'}
          />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{pet.name}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1.5">
          <MapPin size={14} />
          {pet.distance}
        </p>
      </div>
    </div>
  );
};

export default PetCard;