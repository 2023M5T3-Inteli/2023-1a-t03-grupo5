import axios from "axios"

const ProjectService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`/Project/findByID/${id}`)
      return response.data
    }
    catch (error) {
      return []
    }
  },
  findAll: async () => {
    try {
      const response = await axios.get('/Project/findAll')
      return response.data
    }
    catch (error) {
      return []
    }
  },
  create: async (data: any) => {
    try {
      const response = await axios.post('/Project/create', { data })
      return response.data
    }
    catch (error) {
      return []
    }
  }
}

export default ProjectService