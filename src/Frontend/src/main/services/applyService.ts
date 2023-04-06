import axios from "axios";

const PORT = 3001;
const HOST = "localhost"
const API_URL = `http://localhost:${PORT}`

const ApplyService = {
    approveUser: async (id: String) => {
    try {
      const response = await axios.put(`${API_URL}/apply/${id}`);
      return response
    } catch (error: any) {
      return error.response.data
    }
  },

  rejectUser: async (id: String) => {
    try {
      const response = await axios.put(`${API_URL}/user/reject/${id}`);
      return response
    } catch (error: any) {
      return error.response.data
    }
  },

  getAllAppliesFromUser: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/Apply/users/${id}`);
      return response
    } catch (error: any) {
      return error.response.data
    }
  },
};

export default ApplyService;