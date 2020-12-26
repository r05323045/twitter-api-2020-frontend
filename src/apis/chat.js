import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  postChatRoom () {
    return apiHelper.post('/chatroom', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteChatRoom () {
    return apiHelper.delete('/chatroom', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getChatRoom () {
    return apiHelper.get('/chatroom', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
