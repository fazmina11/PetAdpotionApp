import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bell, Check, X, Clock, CheckCircle2, XCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { notificationAPI, adoptionAPI } from '../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationAPI.getNotifications();
      setNotifications(response.notifications);
      setUnreadCount(response.unreadCount);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await notificationAPI.markAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleApprove = async (notificationId, adoptionId) => {
    setActionLoading(prev => ({ ...prev, [notificationId]: 'approving' }));
    try {
      await adoptionAPI.updateStatus(adoptionId, 'approved');
      await notificationAPI.markAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Error approving:', error);
      alert('Failed to approve adoption request');
    } finally {
      setActionLoading(prev => ({ ...prev, [notificationId]: null }));
    }
  };

  const handleReject = async (notificationId, adoptionId) => {
    setActionLoading(prev => ({ ...prev, [notificationId]: 'rejecting' }));
    try {
      await adoptionAPI.updateStatus(adoptionId, 'rejected');
      await notificationAPI.markAsRead(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Error rejecting:', error);
      alert('Failed to reject adoption request');
    } finally {
      setActionLoading(prev => ({ ...prev, [notificationId]: null }));
    }
  };

  const handleComplete = async (notificationId, adoptionId) => {
    setActionLoading(prev => ({ ...prev, [notificationId]: 'completing' }));
    try {
      await adoptionAPI.completeAdoption(adoptionId);
      await notificationAPI.markAsRead(notificationId);
      fetchNotifications();
      alert('Adoption completed successfully! 🎉');
    } catch (error) {
      console.error('Error completing adoption:', error);
      alert('Failed to complete adoption');
    } finally {
      setActionLoading(prev => ({ ...prev, [notificationId]: null }));
    }
  };

  const handleDelete = async (notificationId) => {
    try {
      await notificationAPI.deleteNotification(notificationId);
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      adoption_request: { icon: Heart, bg: 'bg-purple-100', color: 'text-purple-600' },
      adoption_approved: { icon: CheckCircle2, bg: 'bg-green-100', color: 'text-green-600' },
      adoption_rejected: { icon: XCircle, bg: 'bg-red-100', color: 'text-red-600' },
      adoption_completed: { icon: CheckCircle2, bg: 'bg-blue-100', color: 'text-blue-600' }
    };

    const config = icons[type] || icons.adoption_request;
    const Icon = config.icon;

    return (
      <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon size={24} className={config.color} />
      </div>
    );
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return 'Just now';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/home')}
              className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </button>
            
            <div className="flex-1 ml-4">
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-gray-600">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition text-sm"
              >
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Notifications</h2>
            <p className="text-gray-600">You're all caught up! Check back later for new updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className={`bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all ${
                  !notification.read ? 'border-2 border-primary-300' : 'border-2 border-transparent'
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  {getNotificationIcon(notification.type)}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Pet Image & Message */}
                    <div className="flex gap-3 mb-3">
                      {notification.pet?.image && (
                        <img
                          src={notification.pet.image}
                          alt={notification.pet.name}
                          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition"
                          onClick={() => navigate(`/pet/${notification.pet._id}`)}
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-gray-900 font-semibold text-lg leading-tight mb-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{getTimeAgo(notification.createdAt)}</span>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-primary-600 rounded-full ml-1"></span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {notification.actionRequired && notification.type === 'adoption_request' && (
                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => handleApprove(notification._id, notification.adoption)}
                          disabled={actionLoading[notification._id]}
                          className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {actionLoading[notification._id] === 'approving' ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Approving...
                            </>
                          ) : (
                            <>
                              <Check size={20} />
                              Approve
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleReject(notification._id, notification.adoption)}
                          disabled={actionLoading[notification._id]}
                          className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {actionLoading[notification._id] === 'rejecting' ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Rejecting...
                            </>
                          ) : (
                            <>
                              <X size={20} />
                              Reject
                            </>
                          )}
                        </button>
                      </div>
                    )}

                    {notification.actionRequired && notification.type === 'adoption_approved' && (
                      <button
                        onClick={() => handleComplete(notification._id, notification.adoption)}
                        disabled={actionLoading[notification._id]}
                        className="w-full py-3 bg-gradient-purple text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                      >
                        {actionLoading[notification._id] === 'completing' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Completing...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={20} />
                            Mark as Done
                          </>
                        )}
                      </button>
                    )}

                    {/* Mark as Read / Delete */}
                    <div className="flex gap-2 mt-4">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification._id)}
                          className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition text-sm"
                        >
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification._id)}
                        className="flex-1 py-2 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;