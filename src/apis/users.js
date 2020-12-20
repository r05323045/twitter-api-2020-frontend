import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const userId = () => Response.data.user.id
export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getSettingPage ({ userId }) {
     return apiHelper.get(`/users/${userId}/setting`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  putSetting ({ formData }) {
    return apiHelper.put(`/users/${userId}/setting`, formData, {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
