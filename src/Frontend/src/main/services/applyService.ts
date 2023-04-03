import axios from "axios";

const PORT = 3001;
const HOST = "localhost"
const API_URL = `http://alb-lakitu-1821142311.us-east-1.elb.amazonaws.com`

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
  }
};

export default ApplyService;