import axios from "axios"

const ProjectService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`/api/project/${id}`)
      return response.data
    }
    catch (error) {
      return []
    }
  },
  findAll: async () => {
    try {
      const response = await axios.get('/api/project')
      return response.data
    }
    catch (error) {
      return []
    }
  },
  create: async (data: any) => {
    try {
      const response = await axios.post('/api/project', { data })
      return response.data
    }
    catch (error) {
      return []
    }
  }
}

export default ProjectService