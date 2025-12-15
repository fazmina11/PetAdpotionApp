import React, { useState, useEffect } from 'react';
import { Home, Bell, MessageCircle, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ activeNav, setActiveNav }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      // Poll for new notifications every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationAPI.getNotifications();
      setUnreadCount(response.unreadCount);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    if (nav === 'home') {
      navigate('/home');
    } else if (nav === 'notification') {
      navigate('/notifications');
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-white rounded-3xl px-6 py-4 shadow-2xl flex items-center gap-5 z-50">
      <button 
        onClick={() => handleNavClick('home')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'home' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <Home size={24} />
        <span className="text-xs font-medium">Home</span>
      </button>

      <button 
        onClick={() => handleNavClick('notification')}
        className={`relative flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'notification' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <div className="relative">
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </div>
        <span className="text-xs font-medium">Notification</span>
      </button>

      <button className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform -mt-8">
        <Plus size={32} className="text-white" />
      </button>

      <button 
        onClick={() => handleNavClick('chat')}
        className={`flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
          activeNav === 'chat' ? 'text-primary-600' : 'text-gray-400 hover:bg-gray-50'
        }`}
      >
        <MessageCircle size={24} />
        <span className="text-xs font-medium">Chat</span>
      </button>

      <button 
        onClick={() => handleNavClick('profile')}
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