import axios from 'axios'

const { REACT_APP_BASE_URL_LOCAL_HOST } = process.env
console.log(REACT_APP_BASE_URL_LOCAL_HOST)

const baseAxios = axios.create({
  baseURL: 'http://localhost:4321',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default baseAxios
