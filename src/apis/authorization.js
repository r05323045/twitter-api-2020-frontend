import { apiHelper } from './../utils/helpers'
// const getToken = () => localStorage.getItem('token')

export default {
  signIn ({ account, password }) {
    return apiHelper.post('/signin', {
      account,
      password
    })
  },
  signUp (data) {
    return apiHelper.post('/signup', {
      ...data
    })
  }
}

