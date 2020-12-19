import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser () {
    return apiHelper.get('api/users/1', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get ({ userId }) {
    return apiHelper.get(`api/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
