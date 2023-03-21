import axios from "axios"

export const getProject = async (id: String) => {
  try {
    const response = await axios.get(`/api/project/${id}`)
    return response.data
  }
  catch (error) {
    return []
  }
}

export const getAllProjects = async () => {
  try {
    const response = await axios.get('/api/project')
    return response.data
  }
  catch (error) {
    return []
  }
}

export const createProject = async (data: any) => {
  try {
    const response = await axios.post('/api/project', {data})
    return response.data
  }
  catch (error) {
    return []
  }
}
