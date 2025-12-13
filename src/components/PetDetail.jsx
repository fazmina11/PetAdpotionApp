import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, User, Mail, Phone as PhoneIcon, MapPin, Calendar } from 'lucide-react';
import { petsAPI, favoritesAPI, adoptionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const PetDetail = () => {
  const [pet, setPet] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adoptLoading, setAdoptLoading] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    if (id && id !== 'undefined') {
      fetchPet();
      if (user) {
        checkFavoriteStatus();
      }
    } else {
      navigate('/home');
    }
  }, [id, user]);

  const fetchPet = async () => {
    setLoading(true);
    try {
      const response = await petsAPI.getPetById(id);
      setPet(response.pet);
    } catch (error) {
      console.error('Error fetching pet:', error);
      alert('Pet not found');
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!id || id === 'undefined') return;
    
    try {
      const response = await favoritesAPI.checkFavorite(id);
      setIsFavorite(response.isFavorite);
    } catch (error) {
      setIsFavorite(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      alert('Please login to add favorites');
      navigate('/login');
      return;
    }

    try {
      const response = await favoritesAPI.toggleFavorite(id);
      setIsFavorite(response.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleAdopt = async () => {
    if (!user) {
      alert('Please login to adopt pets');
      navigate('/login');
      return;
    }

    setAdoptLoading(true);
    try {
      const response = await adoptionAPI.requestAdoption(
        id,
        `I'm interested in adopting ${pet?.name}`
      );
      alert(response.message);
    } catch (error) {
      console.error('Error requesting adoption:', error);
      alert(error.message || 'Failed to submit adoption request');
    } finally {
      setAdoptLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading pet details...</p>
        </div>
      </div>
    );
  }

  if (!pet) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white sticky top-0 z-10 shadow-sm">
          <button 
            onClick={() => navigate('/home')}
            className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition"
          >
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Pet Details</h1>
          <button 
            onClick={handleFavoriteToggle}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
              isFavorite ? 'bg-red-500' : 'bg-gray-100'
            }`}
          >
            <Heart 
              size={24} 
              fill={isFavorite ? 'white' : 'none'} 
              className={isFavorite ? 'text-white' : 'text-red-500'}
            />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-12">
          {/* Left: Image */}
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-purple-200 to-purple-300 shadow-2xl">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Details */}
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-3">{pet.name}</h1>
                <p className="text-2xl text-gray-600">{pet.breed}</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold text-primary-600">${pet.price}</span>
                <p className="text-sm text-gray-500 mt-1">Adoption Fee</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-600 mb-8">
              <MapPin size={20} />
              <span className="text-lg">{pet.location}</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-yellow-50 rounded-2xl p-6 text-center border border-yellow-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">{pet.age}</div>
                <div className="text-sm text-gray-600">Age</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">{pet.gender}</div>
                <div className="text-sm text-gray-600">Gender</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-200">
                <div className="text-2xl font-bold text-gray-900 mb-1">{pet.weight}</div>
                <div className="text-sm text-gray-600">Weight</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {pet.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {showFullText ? pet.description : `${pet.description.substring(0, 200)}...`}
                {!showFullText && pet.description.length > 200 && (
                  <button 
                    onClick={() => setShowFullText(true)}
                    className="text-primary-600 font-semibold ml-1 hover:text-primary-700"
                  >
                    Read more
                  </button>
                )}
              </p>
            </div>

            {/* Contact Details */}
            <div className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl p-8 mb-8 border border-primary-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User size={24} className="text-primary-600" />
                Contact Owner
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 bg-white rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Owner Name</p>
                    <p className="font-semibold text-gray-900 text-lg">{pet.owner?.name || 'Anonymous'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <PhoneIcon size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                    <p className="font-semibold text-gray-900 text-lg">{pet.owner?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-2xl p-4">
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="font-semibold text-gray-900 text-lg break-all">{pet.owner?.email || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <Calendar size={16} className="text-gray-400" />
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(pet.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center hover:bg-purple-200 transition">
                <MessageCircle size={28} className="text-primary-600" />
              </button>
              <button 
                onClick={handleAdopt}
                disabled={adoptLoading || pet.status !== 'available'}
                className="flex-1 py-5 bg-gradient-purple text-white rounded-2xl text-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-xl"
              >
                {adoptLoading ? 'Processing...' : pet.status === 'adopted' ? 'Already Adopted' : pet.status === 'pending' ? 'Pending' : 'Adopt Me'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;