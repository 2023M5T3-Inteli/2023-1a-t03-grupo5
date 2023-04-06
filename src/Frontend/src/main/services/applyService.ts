import axios from "axios";

const PORT = 3001;
const HOST = "localhost"
// const API_URL = `http://alb-lakitu-1821142311.us-east-1.elb.amazonaws.com`
const API_URL = `http://${HOST}:${PORT}`

const ApplyService = {
  approveUser: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/Apply/approve/${id}`);
      return response
    } catch (error: any) {
      return error.response.data
    }
  },
  apply: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/Apply/create`, data);
      return response
    } catch (error: any) {
      return error.response.data
    }
  },
  deleteApply: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/Apply/delete/${id}`)
      return response
    } catch (error: any) {
      return error.response.data
    }
  },
  applyByUser: async (projectId: String, userId: string) => {
    console.log(projectId, userId)
    try {
      const response = await axios.post(`${API_URL}/Apply/getApplyByUser/`, {
        projectId: projectId,
        userId: userId
      });
      return response
    } catch (error: any) {
      return error.response.data
    }
  },
  changeStatus: async (id: String, status: string, feedback?: string) => {
    try {
      let response
      if (!feedback) {
        response = await axios.put(`${API_URL}/Apply/updateFeedback/${id}`, {
          status: status
        })
      }
      else {
        response = await axios.put(`${API_URL}/Apply/updateFeedback/${id}`, {
          status: status,
          feedback: feedback
        })
      }
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