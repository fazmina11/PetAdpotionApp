import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle } from 'lucide-react';

const PetDetail = () => {
  const [isFavorite, setIsFavorite] = useState(true);
  const [showFullText, setShowFullText] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const petData = {
    id: 1,
    name: 'Brook',
    price: 120,
    distance: '1.2 Km Away',
    age: '2.5 Years',
    sex: 'Female',
    weight: '10 Kg',
    image: 'https://images.unsplash.com/photo-1612536148875-8b17f6e574f7?w=500&h=500&fit=crop',
    description: 'The Pembroke Welsh Corgi is a cattle dog & breed that originated in Wales. It is one of two breeds known as a Welsh Corgi. descends from the Teckel family of dogs. Other is the Cardigan.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-yellow-100 p-4 md:p-10 flex justify-center items-center">
      <div className="bg-white rounded-3xl p-6 md:p-12 max-w-4xl w-full shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate('/home')}
            className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
              isFavorite ? 'bg-red-500' : 'bg-white border-2 border-red-200'
            }`}
          >
            <Heart 
              size={24} 
              fill={isFavorite ? 'white' : 'none'} 
              className={isFavorite ? 'text-white' : 'text-red-500'}
            />
          </button>
        </div>

        <div className="w-80 h-80 mx-auto mb-8 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-end justify-center overflow-hidden shadow-xl">
          <img src={petData.image} alt={petData.name} className="w-full h-full object-cover" />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{petData.name}</h1>
            <span className="text-3xl md:text-4xl font-bold text-primary-600">${petData.price}</span>
          </div>
          <p className="text-gray-500 mb-6">{petData.distance}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-yellow-100 rounded-2xl p-5 text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">{petData.age}</div>
              <div className="text-sm text-gray-600">Age</div>
            </div>
            <div className="bg-purple-100 rounded-2xl p-5 text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">{petData.sex}</div>
              <div className="text-sm text-gray-600">Sex</div>
            </div>
            <div className="bg-green-100 rounded-2xl p-5 text-center">
              <div className="text-xl font-bold text-gray-900 mb-1">{petData.weight}</div>
              <div className="text-sm text-gray-600">Weight</div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">About {petData.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-2">
              {showFullText ? petData.description : `${petData.description.substring(0, 120)}...`}
              {!showFullText && (
                <button 
                  onClick={() => setShowFullText(true)}
                  className="text-primary-600 font-semibold ml-1 hover:text-primary-700"
                >
                  Read more...
                </button>
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center hover:bg-purple-200 transition-colors">
            <MessageCircle size={28} className="text-primary-600" />
          </button>
          <button 
            onClick={() => alert('Adoption request sent!')}
            className="flex-1 py-5 bg-gradient-purple text-white rounded-2xl text-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Adopt Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;