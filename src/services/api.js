// Real API Service - Connects to Backend

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`
  };
};

// ============================================
// AUTHENTICATION APIs
// ============================================

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return data;
  },

  signup: async (name, email, phone, password) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, phone, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to get user');
    }

    return data.user;
  }
};

// ============================================
// PETS APIs
// ============================================

export const petsAPI = {
  getAllPets: async (category = null) => {
    const url = category 
      ? `${API_URL}/pets?category=${category}`
      : `${API_URL}/pets`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch pets');
    }

    return data;
  },

  getPetById: async (petId) => {
    const response = await fetch(`${API_URL}/pets/${petId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch pet');
    }

    return data;
  },

  addPet: async (petData, imageFile) => {
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
      headers: getAuthHeaders(),
      body: formData
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add pet');
    }

    return data;
  },

  searchPets: async (searchTerm) => {
    const response = await fetch(`${API_URL}/pets?search=${searchTerm}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Search failed');
    }

    return data;
  }
};

// ============================================
// FAVORITES APIs
// ============================================

export const favoritesAPI = {
  toggleFavorite: async (petId) => {
    const response = await fetch(`${API_URL}/favorites/${petId}`, {
      method: 'POST',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to toggle favorite');
    }

    return data;
  },

  getFavorites: async () => {
    const response = await fetch(`${API_URL}/favorites`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch favorites');
    }

    return data;
  },

  checkFavorite: async (petId) => {
    const response = await fetch(`${API_URL}/favorites/${petId}/check`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to check favorite');
    }

    return data;
  }
};

// ============================================
// ADOPTION APIs
// ============================================

export const adoptionAPI = {
  requestAdoption: async (adoptionData) => {
    console.log('API: Requesting adoption with data:', adoptionData);
    
    const response = await fetch(`${API_URL}/adoptions`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(adoptionData)
    });

    const data = await response.json();
    console.log('API: Adoption request response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to request adoption');
    }

    return data;
  },

  getMyRequests: async () => {
    const response = await fetch(`${API_URL}/adoptions/my-requests`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch requests');
    }

    return data;
  },

  getReceivedRequests: async () => {
    const response = await fetch(`${API_URL}/adoptions/received`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch requests');
    }

    return data;
  },

  updateStatus: async (adoptionId, status) => {
    console.log('API: Updating adoption status:', { adoptionId, status });
    
    const response = await fetch(`${API_URL}/adoptions/${adoptionId}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });

    const data = await response.json();
    console.log('API: Update status response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update status');
    }

    return data;
  },

  completeAdoption: async (adoptionId) => {
    console.log('API: Completing adoption:', adoptionId);
    
    const response = await fetch(`${API_URL}/adoptions/${adoptionId}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    const data = await response.json();
    console.log('API: Complete adoption response:', data);

    if (!response.ok) {
      throw new Error(data.message || 'Failed to complete adoption');
    }

    return data;
  }
};

// ============================================
// NOTIFICATION APIs
// ============================================

export const notificationAPI = {
  getNotifications: async () => {
    const response = await fetch(`${API_URL}/notifications`, {
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch notifications');
    }

    return data;
  },

  markAsRead: async (notificationId) => {
    const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to mark as read');
    }

    return data;
  },

  markAllAsRead: async () => {
    const response = await fetch(`${API_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to mark all as read');
    }

    return data;
  },

  deleteNotification: async (notificationId) => {
    const response = await fetch(`${API_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete notification');
    }

    return data;
  }
};