import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
export default {
  getTweets () {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getTweet ({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postReply ({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment: comment }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweet ({ description }) {
    return apiHelper.post('/tweets', { description: description }, {
      headers: { Authorization: `Bearer ${getToken()}` }

    })
  }
}
