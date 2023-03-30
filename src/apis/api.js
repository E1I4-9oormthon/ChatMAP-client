import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: sessionStorage.getItem('accesstoken'),
  },
})

api.interceptors.request.use(
  function (config) {
    console.log('request', config)
    return config
  },
  function (error) {
    console.log('request error', error)
    return Promise.reject(error)
  }
)

export default api
