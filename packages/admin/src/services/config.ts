import axios from 'axios'

const { NEXT_APP_BASE_URL_LOCAL_HOST } = process.env
console.log(NEXT_APP_BASE_URL_LOCAL_HOST)

const baseAxios = axios.create({
  baseURL: NEXT_APP_BASE_URL_LOCAL_HOST || 'http://localhost:4321',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseAxios
