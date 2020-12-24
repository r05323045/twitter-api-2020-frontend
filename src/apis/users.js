import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
const userId = () => Response.data.user.id

export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getProfile ({ userId }) {
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
  },
  getTopUsers () {
    return apiHelper.get('/users/top', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLikes ({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }

    })
  },
  getFollowings ({userId}) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }

    })
  },

  getFollowers ({userId}) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }

    })
  }
}
