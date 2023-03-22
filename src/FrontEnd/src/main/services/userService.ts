import axios from "axios"

const PORT = 3001;
const HOST = 'localhost';
const API_URL = `http://${HOST}:${PORT}`;

const UserService = {
  findByID: async (id: String) => {
    try {
      const response = await axios.get(`${API_URL}/User/Info/${id}`)
      return response.data
    }
    catch (error) {
      return []
    }
  }
}

export default UserService