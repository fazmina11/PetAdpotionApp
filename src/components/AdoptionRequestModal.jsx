import React, { useState } from 'react';
import { X, Heart, User, Mail, Phone as PhoneIcon } from 'lucide-react';
import { adoptionAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdoptionRequestModal = ({ isOpen, onClose, pet, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: user?.phone || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.reason || !formData.experience || !formData.contactName || !formData.contactEmail || !formData.contactPhone) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await adoptionAPI.requestAdoption({
        petId: pet._id,
        ...formData
      });
      
      if (onSuccess) {
        onSuccess(response.message);
      }
      
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (err) {
      setError(err.message || 'Failed to submit adoption request. Please try again.');
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Adoption Request</h2>
            <p className="text-gray-600 mt-1">Tell us why you'd like to adopt {pet?.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Pet Info */}
          <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
            <div className="flex items-center gap-4">
              <img 
                src={pet?.image} 
                alt={pet?.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{pet?.name}</h3>
                <p className="text-gray-600">{pet?.breed} • {pet?.age}</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Why do you want to adopt {pet?.name}? *
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                placeholder="Tell us your reasons for wanting to adopt this pet..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Experience with Pets *
              </label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                placeholder="Share your past experience with pets..."
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                required
              ></textarea>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <div className="relative">
                    <PhoneIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-4 bg-gradient-purple text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Heart size={20} />
                  Submit Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionRequestModal;