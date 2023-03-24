import axios from "axios";
import cookie from "react-cookies";

const PORT = 3001;
const HOST = "localhost";
const API_URL = `http://${HOST}:${PORT}`;

const config = {
  headers: {
    Authorization: `Bearer ${cookie.load("token")}`,
  },
};

const UserService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/user/info/${id}`, config);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  validate: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/Info`, config);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  findAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/find-all`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  update: async (id: String, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/user/update/${id}`, data);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  create: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/user/create`, data);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  delete: async (id: String) => {
    try {
      const response = await axios.delete(`${API_URL}/user/delete/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  getByName: async (name: String) => {
    try {
      const response = await axios.get(`${API_URL}/user/find-by-name/${name}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },


};

export default UserService;
