import axios from "axios"
import cookie from "react-cookies";

const PORT = 3001;
const HOST = 'localhost';
//const API_URL = `http://alb-lakitu-1821142311.us-east-1.elb.amazonaws.com`;
const API_URL = 'http://localhost:3001'

const ProjectService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/Project/findByID/${id}`)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  findAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/Project/findAll`)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  create: async (data: any) => {
    const config = {
      headers: {
        "Authorization": `Bearer ${cookie.load("token")}`
      }
    }

    try {
      const response = await axios.post(`${API_URL}/Project/create`, data, config)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  edit: async (data: any) => {
    try {
      const response = await axios.put(`${API_URL}/Project/update/${data.projectId}`, data)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/Project/delete/${id}`)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  filter: async (data: any) => {
    const config = {
      headers: {
        "Authorization": `Bearer ${cookie.load("token")}`
      }
    }

    try {
      const response = await axios.post(`${API_URL}/Project/filter`, data, config)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  approve: async (token: string, status: string) => {
    try {
      const response = await axios.put(`${API_URL}/Project/approve/${token}`, {
        status: status
      })
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  reprove: async (token: string, status: string, feedback: string) => {
    try {
      const response = await axios.put(`${API_URL}/Project/approve/${token}`, {
        status: status,
        feedback: feedback
      })
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  },
  finish: async (id: string) => {
    const config = {
      headers: {
        "Authorization": `Bearer ${cookie.load("token")}`
      }
    }

    try {
      const response = await axios.put(`${API_URL}/Project/Finalize/${id}`, {}, config)
      return response
    }
    catch (error: any) {
      return error.response.data
    }
  }
}

export default ProjectService