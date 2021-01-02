import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  deleteChatRoom () {
    return apiHelper.delete('/chatroom', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getChatRoom () {
    return apiHelper.get('/chatroom', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  readMessages ({ userId }) {
    return apiHelper.put('/chatroom/read', { id: userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUnreadMessages () {
    return apiHelper.get('/chatroom/unread', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
