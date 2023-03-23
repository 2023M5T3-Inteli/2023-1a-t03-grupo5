import axios from "axios";

const PORT = 3001;
const HOST = "localhost";
const API_URL = `http://${HOST}:${PORT}`;

const ApplyService = {
    approveUser: async (id: String) => {
    try {
      const response = await axios.put(`${API_URL}/apply//${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  },

  rejectUser: async (id: String) => {
    try {
      const response = await axios.put(`${API_URL}/user/reject/${id}`);
      return response.data;
    } catch (error) {
      return [];
    }
  }
};

export default ApplyService;