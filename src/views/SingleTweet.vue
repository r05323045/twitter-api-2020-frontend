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
    this.fetchTweet() 
  },
  methods: {
    async fetchTweet() {
        try{
            console.log('1')
            const response = await tweetsAPI.getTweet({})
            console.log('2')            
            const { tweet, replies, likes } = response.data 
            console.log('3')
            this.tweet = tweet
            this.replies = replies
            this.likes = likes 
            console.log('4')
        }catch(error) {
            Toast.fire({
                icon: 'error',
                title: '無法取得餐廳資料，請稍後再試'
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