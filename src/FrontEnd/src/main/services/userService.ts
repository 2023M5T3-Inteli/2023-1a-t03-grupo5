import axios from "axios";
import cookie from "react-cookies";

const PORT = 3001;
const HOST = "localhost";
const API_URL = `http://${HOST}:${PORT}`;

const UserService = {
  findByID: async (id: String) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.get(`${API_URL}/user/info/${id}`, config);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  validate: async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.get(`${API_URL}/user/Info`, config);
      return response.data;
    } catch (error) {
      return error.response.status;
    }
  },

  findAll: async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.get(`${API_URL}/user/getAll`, config);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  update: async (id: String, data: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.put(`${API_URL}/user/update/${id}`, data);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  create: async (data: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.post(`${API_URL}/user/create`, data);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  delete: async (id: String) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };

    try {
      const response = await axios.delete(`${API_URL}/user/delete/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getByName: async (name: String) => {
    const config = {
      headers: {
        Authorization: `Bearer ${cookie.load("token")}`,
      },
    };
    
    try {
      const response = await axios.get(`${API_URL}/user/find-by-name/${name}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },


};

export default UserService;
