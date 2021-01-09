import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  addSubscribe ({ userId }) {
    return apiHelper.post('/subscribes', { id: userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteSubscribe ({ userId }) {
    return apiHelper.delete(`/subscribes/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getNotifications () {
    return apiHelper.get('/notifications', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  readNotifications (userId) {
    return apiHelper.put('/notifications/read', { id: userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
