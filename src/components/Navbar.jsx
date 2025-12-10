import React from 'react';
import { Home, Bell, MessageCircle, User, Plus } from 'lucide-react';

const Navbar = ({ activeNav, setActiveNav }) => {
  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl px-6 py-4 shadow-2xl flex items-center gap-5 z-50">
      <button 
        onClick={() => setActiveNav('home')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'home' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <Home size={24} />
        <span className="text-xs font-medium">Home</span>
      </button>

      <button 
        onClick={() => setActiveNav('notification')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'notification' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <Bell size={24} />
        <span className="text-xs font-medium">Notification</span>
      </button>

      <button className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform -mt-8">
        <Plus size={32} className="text-white" />
      </button>

      <button 
        onClick={() => setActiveNav('chat')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'chat' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <MessageCircle size={24} />
        <span className="text-xs font-medium">Chat</span>
      </button>

      <button 
        onClick={() => setActiveNav('profile')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'profile' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <User size={24} />
        <span className="text-xs font-medium">Profile</span>
      </button>
    </div>
  );
};

export default Navbar;