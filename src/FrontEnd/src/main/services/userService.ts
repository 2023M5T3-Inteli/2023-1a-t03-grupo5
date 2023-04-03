import axios from "axios";
import cookie from "react-cookies";

const PORT = 3001;
const HOST = "localhost";
const API_URL = `http://alb-lakitu-1821142311.us-east-1.elb.amazonaws.com`

console.log(API_URL)

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
  auth: async (email: string, pass: string) => {
    try {
      console.log(API_URL)
      console.log(email);
      console.log(pass)
      const response = await axios.post(
        `${API_URL}/auth/login`, {
        email: email,
        password: pass
      })
      cookie.save("token", response.data.token, {})
      return response
    }
    catch (error: any) {
      return error.response.data
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
      return error;
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
