import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')
// const tweetId = Response.data.tweet.id
export default {
  getTweets () {
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweet() {
    // console.log("Response", tweetId)
    // const searchParams = new URLSearchParams({ tweetId })
      return apiHelper.get('/tweets/:id', {
        headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
