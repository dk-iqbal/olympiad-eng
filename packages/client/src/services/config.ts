import axios from 'axios'

const { NEXT_BASE_URL_LOCAL_HOST } = process.env

const clientAxios = axios.create({
  baseURL: NEXT_BASE_URL_LOCAL_HOST  || 'http://localhost:4321',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default clientAxios
