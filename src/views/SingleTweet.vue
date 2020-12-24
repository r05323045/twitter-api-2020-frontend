<template>
  <div class="page-container">
    <Navbar />
    <SingleContent 
    :initial-tweet="tweet" 
    :initial-replies="replies" 
    :initial-likes="likes" />
    <RecommendUsers />
  </div>
</template>

<script>
  import Navbar from './../components/Navbar'
  import SingleContent from './../components/SingleContent'
  import RecommendUsers from './../components/RecommendUsers'
  import tweetsAPI from './../apis/tweets'  
  import { Toast } from '@/utils/helpers'
  // import store from './../store'
  export default {
  data() {
    return {
      tweet: [],
      replies: [],
      likes: [],
      
    }
  },
  components: {
    Navbar,
    SingleContent,
    RecommendUsers,
  },
  created() {
    const { id } = this.$route.params
    this.fetchTweet(id) 
    // console.log("id:", id)
  }, 
  methods: {
    async fetchTweet(tweetId) {
        try{
            console.log("tweetId", tweetId)
            console.log('1')
            console.log("response 1", response)
            const response = await tweetsAPI.getTweet({tweetId}) 

            console.log("response 2", response)
            console.log('2')            
            const { tweet, replies, likes } = response.data 
            console.log('3')
            this.tweet = tweet
            this.replies = replies
            this.likes = likes 
            console.log('4')
            console.log('tweet', tweet)
        }catch(error) {
            Toast.fire({
                icon: 'error',
                title: '無法取得資料，請稍後再試'
            })
        }
    },
  }
}
</script>

<style lang="scss">
  .page-container {
    height: 100%;

    width: 100%;
    display: flex;
    flex-direction: row;
    
  } 
</style>