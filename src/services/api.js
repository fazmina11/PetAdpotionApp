// Real API Service - Connects to Backend
// All functions handle errors properly and never leave UI hanging

const API_URL = 'http://localhost:5000/api';

// ============================================
// Helper: Get Auth Headers with Token
// ============================================
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
};

// ============================================
// Helper: Handle API Response
// ============================================
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || `API Error: ${response.status}`);
  }
  
  return data;
};

// ============================================
// AUTHENTICATION APIs
// ============================================
export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  },

  signup: async (name, email, phone, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Signup failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: getAuthHeaders()
      });
      const data = await handleResponse(response);
      return data.user;
    } catch (error) {
      throw new Error(error.message || 'Failed to get user');
    }
  }
};

// ============================================
// PETS APIs
// ============================================
export const petsAPI = {
  getAllPets: async (category = null) => {
    try {
      const url = category 
        ? `${API_URL}/pets?category=${category}`
        : `${API_URL}/pets`;

      const response = await fetch(url);
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pets');
    }
  },

  getPetById: async (petId) => {
    try {
      const response = await fetch(`${API_URL}/pets/${petId}`);
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch pet');
    }
  },

  addPet: async (petData, imageFile) => {
    try {
      const formData = new FormData();
      
      Object.keys(petData).forEach(key => {
        if (petData[key]) {
          formData.append(key, petData[key]);
        }
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${API_URL}/pets`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to add pet');
    }
  },

  searchPets: async (searchTerm) => {
    try {
      const response = await fetch(`${API_URL}/pets?search=${searchTerm}`);
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Search failed');
    }
  }
};

// ============================================
// FAVORITES APIs
// ============================================
export const favoritesAPI = {
  toggleFavorite: async (petId) => {
    try {
      const response = await fetch(`${API_URL}/favorites/${petId}`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to toggle favorite');
    }
  },

  getFavorites: async () => {
    try {
      const response = await fetch(`${API_URL}/favorites`, {
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch favorites');
    }
  },

  checkFavorite: async (petId) => {
    try {
      const response = await fetch(`${API_URL}/favorites/${petId}/check`, {
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to check favorite');
    }
  }
};

// ============================================
// ADOPTION APIs
// ============================================
export const adoptionAPI = {
  requestAdoption: async (adoptionData) => {
    try {
      const response = await fetch(`${API_URL}/adoptions`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(adoptionData)
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to request adoption');
    }
  },

  getMyRequests: async () => {
    try {
      const response = await fetch(`${API_URL}/adoptions/my-requests`, {
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch requests');
    }
  },

  getReceivedRequests: async () => {
    try {
      const response = await fetch(`${API_URL}/adoptions/received`, {
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch requests');
    }
  },

  updateStatus: async (adoptionId, status) => {
    try {
      if (!adoptionId) {
        throw new Error('Adoption ID is required');
      }

      const response = await fetch(`${API_URL}/adoptions/${adoptionId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status })
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to update status');
    }
  },

  completeAdoption: async (adoptionId) => {
    try {
      if (!adoptionId) {
        throw new Error('Adoption ID is required');
      }

      const response = await fetch(`${API_URL}/adoptions/${adoptionId}/complete`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to complete adoption');
    }
  }
};

// ============================================
// NOTIFICATION APIs
// ============================================
export const notificationAPI = {
  getNotifications: async () => {
    try {
      const response = await fetch(`${API_URL}/notifications`, {
        headers: getAuthHeaders()
      });
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch notifications');
    }
  },

  markAsRead: async (notificationId) => {
    try {
      if (!notificationId) {
        throw new Error('Notification ID is required');
      }

      const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to mark as read');
    }
  },

  markAllAsRead: async () => {
    try {
      const response = await fetch(`${API_URL}/notifications/read-all`, {
        method: 'PUT',
        headers: getAuthHeaders()
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to mark all as read');
    }
  },

  deleteNotification: async (notificationId) => {
    try {
      if (!notificationId) {
        throw new Error('Notification ID is required');
      }

      const response = await fetch(`${API_URL}/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      
      return await handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Failed to delete notification');
    }
  }
};