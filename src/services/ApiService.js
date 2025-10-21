import Axios from "axios";

const API_BASE_URL = "https://backend.paradisepeaktravels.com/api/v1";

export default class ApiService {
  static getToken() {
    return localStorage.getItem("token");
  }

  static getHeader() {
    const token = this.getToken();
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userid");
  }

  static async contact(contactData) {
    const response = await Axios.post(`${API_BASE_URL}/contact`, contactData);
    return response.data;
  }
  static async login(loginData) {
    const response = await Axios.post(`${API_BASE_URL}/auth/login`, loginData);
    return response.data;
  }

  static async register(registerData) {
    const response = await Axios.post(
      `${API_BASE_URL}/auth/register`,
      registerData
    );
    return response.data;
  }

  static async getUserDataById(params = {}) {
    try {
      const id = localStorage.getItem("userid");
      const response = await Axios.get(`${API_BASE_URL}/auth/user/${id}`, {
        params,
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async createReview(reviewData) {
    try {
      const response = await Axios.post(`${API_BASE_URL}/reviews`, reviewData, {
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create review" };
    }
  }

  static async getUserReviews(userId) {
    try {
      const response = await Axios.get(
        `${API_BASE_URL}/reviews/user/${userId}`,
        {
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch user reviews" };
    }
  }

  static async deleteReview(id) {
    try {
      const response = await Axios.delete(`${API_BASE_URL}/reviews/${id}`, {
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete review" };
    }
  }

  static async updateReview(id, data) {
    try {
      const response = await Axios.put(`${API_BASE_URL}/reviews/${id}`, data, {
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update review" };
    }
  }

  static async getSharePhotos(params = {}) {
    try {
      const id = localStorage.getItem("userid");
      const response = await Axios.get(`${API_BASE_URL}/photos/${id}`, {
        params,
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async addSharePhoto(data) {
    const res = await Axios.post(`${API_BASE_URL}/photos`, data, {
      headers: this.getHeader(),
    });
    return res.data;
  }

  static async getPackages(params = {}) {
    try {
      const response = await Axios.get(`${API_BASE_URL}/packages`, {
        params,
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }

  static async getGallery(params = {}) {
    const response = await Axios.get(`${API_BASE_URL}/gallery`, {
      params,
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async createSubscriber(subscriberData) {
    const response = await Axios.post(
      `${API_BASE_URL}/subscribers`,
      subscriberData
    );
    return response.data;
  }
  static async unSubscribe(token) {
    const response = await Axios.post(
      `${API_BASE_URL}/subscribers/unsubscribe`,
      { unsubToken: token },
      { headers: this.getHeader() }
    );
    return response.data;
  }

  static async verifySubscribe(token) {
    const response = await Axios.get(`${API_BASE_URL}/subscribers/verify`, {
      params: { verificationToken: token },
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getBookingsByEmail(email, params = {}) {
    try {
      const response = await Axios.get(
        `${API_BASE_URL}/bookings/user/${email}`,
        {
          params,
          headers: this.getHeader(),
        }
      );
      return response.data;
    } catch (error) {
      throw (error.response && error.response.data) || error.message;
    }
  }

  static async updateBooking(id, data) {
    try {
      const response = await Axios.put(`${API_BASE_URL}/bookings/${id}`, data, {
        headers: this.getHeader(),
      });
      return response.data;
    } catch (error) {
      throw (error.response && error.response.data) || error.message;
    }
  }
  static async createBooking(bookingData) {
    try {
      const response = await Axios.post(
        `${API_BASE_URL}/bookings`,
        bookingData,
        // { headers: this.getHeader() }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
}
