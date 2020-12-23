import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  signIn ({ account, password }) {
    console.log('hi')
    return apiHelper.post('/signin', {
      account,
      password
    })
  },
  signUp: {
    create ({ formData }) {
      return apiHelper.post('/users', formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
    }
  },
}
