import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
// const tweetId = () => Response.data.tweet.id 
export default {
  getTweets () {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweet({tweetId}) {
    return apiHelper.get(`/tweets/${tweetId}`, {   
    headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
