import axios from 'axios'

const userAPI = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

userAPI.interceptors.request.use(
  function (config) {
    console.log('request', config)
    return config
  },
  function (error) {
    console.log('request error', error)
    return Promise.reject(error)
  }
)

export default userAPI
