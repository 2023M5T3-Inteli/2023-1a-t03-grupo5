import axios from "axios"
import cookie from "react-cookies";

const PORT = 3001;
const HOST = 'localhost';
const API_URL = `http://${HOST}:${PORT}`;

const ProjectService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/Project/findByID/${id}`)
      return response.data
    }
    catch (error) {
      return []
    }
  },
  findAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/Project/findAll`)
      return response.data
    }
    catch (error) {
      return []
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
      return response.data
    }
    catch (error) {
      return error
    }
  },
  edit: async (data: any) => {
    try {
      const response = await axios.put(`/Project/update/${data.projectId}`, data)
      return response.data
    }
    catch (error) {
      return []
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axios.delete(`/Project/delete/${id}`)
      return response.data
    }
    catch (error) {
      return []
    }
  }
}

export default ProjectService