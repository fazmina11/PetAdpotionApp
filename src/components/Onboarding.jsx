import React from 'react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-secondary p-4 md:p-10">
      <div className="bg-white rounded-3xl p-8 md:p-16 max-w-xl w-full shadow-2xl text-center">
        <div className="relative mb-10">
          {/* Decorative circles */}
          <div className="absolute w-12 h-12 bg-blue-300 rounded-full top-0 left-8 animate-bounce"></div>
          <div className="absolute w-8 h-8 bg-purple-300 rounded-full top-24 right-12"></div>
          <div className="absolute w-14 h-14 bg-yellow-300 rounded-full -top-6 right-8"></div>
          <div className="absolute w-10 h-10 bg-pink-300 rounded-full bottom-6 -left-2"></div>
          
          <div className="w-72 h-72 mx-auto bg-gradient-purple rounded-full flex items-end justify-center overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop" 
              alt="Pets"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Best<br />
            Companion <span className="text-primary-600">With Us</span>
          </h1>
          
          <p className="text-gray-600 text-base md:text-lg leading-relaxed px-4">
            Join & discover the best suitable pets in your location or near you.
          </p>
        </div>

        <div className="flex justify-center gap-2.5 mb-10">
          <div className="w-9 h-2.5 bg-primary-600 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
        </div>

        <button 
          onClick={() => navigate('/signup')}
          className="w-full py-4 bg-gradient-purple text-white rounded-2xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg mb-6"
        >
          Get Started
        </button>

        <p className="text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => navigate('/login')}
            className="text-primary-600 font-semibold underline hover:text-primary-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;