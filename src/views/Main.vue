<template>
  <div class="main">
    <Navbar></Navbar>
    <div class="container">
      <div class="title">首頁</div>
      <div class="post-tweet">
        <form class="content-wrapper">
          <div class="avatar" @click="$router.push('/user/self').catch(()=>{})" :style="{ background: `url(${currentUser.avatar}) no-repeat center/cover` }"></div>
          <textarea class="content" placeholder="有什麼新鮮事？" v-model="tweetDescription"></textarea>
          <button class="btn btn-tweet" @click.stop.prevent="postTweet(tweetDescription)">推文</button>
        </form>
      </div>
      <div class="divider"></div>
      <TweetList :tweets="tweets" @tweetAction="tweetAction"></TweetList>
    </div>
    <RecommendUsers></RecommendUsers>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RecommendUsers from '@/components/RecommendUsers.vue'
import TweetList from '@/components/TweetList.vue'
import TweetsAPI from '@/apis/tweets'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'Main',
  components: {
    Navbar,
    RecommendUsers,
    TweetList
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  data () {
    return {
      tweets: [],
      tweetDescription: ''
    }
  },
  created () {
    this.$bus.$on('tweetAction', action => {
      this.tweetAction(action)
    })
    this.$bus.$on('renewTweets', action => {
      this.fetchTweets(action)
    })
    this.fetchTweets()
  },
  methods: {
    async fetchTweets () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await TweetsAPI.getTweets()
        this.tweets = data.map(tweet => ({
          id: tweet.id,
          userId: tweet.User.id,
          name: tweet.User.name,
          avatar: tweet.User.avatar,
          account: tweet.User.account,
          createdAt: tweet.createdAt,
          description: tweet.description,
          likeTweetCount: tweet.likeTweetCount,
          replyTweetCount: tweet.replyTweetCount,
          isLiked: tweet.isLiked
        }))
        this.tweets.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        })
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得推文，請稍候'
        })
      }
    },
    tweetAction (action) {
      this.tweets = this.tweets.map(tweet => {
        if (tweet.id !== action.tweetId) {
          return tweet
        } else {
          return {
            ...tweet,
            likeTweetCount: action.type === 'like' ? tweet.likeTweetCount + 1 : tweet.likeTweetCount - 1,
            isLiked: !tweet.isLiked
          }
        }
      })
    },
    async postTweet (description) {
      try {
        if (!description) {
          Toast.fire({
            icon: 'error',
            title: '請輸入內容'
          })
          return
        }

        if (description.length > 140) {
          Toast.fire({
            icon: 'error',
            title: '推文字數需在140內'
          })
          return
        }

        const { data } = await TweetsAPI.postTweet({ description })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        await this.fetchTweets()
        this.tweets.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        })
        this.tweetDescription = ''
        this.showNewTweetModal = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法推文，請稍候'
        })
      }
    }
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$divider: #E6ECF0;
.main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .container {
    max-height: 100vh;
    overflow-y: scroll;
    border-left: 1px solid $divider;
    border-right: 1px solid $divider;
    max-width: 600px;
    padding: 0;
    .title {
      border-bottom: 1px solid $divider;
      height: 55px;
      padding: 15px 0 15px 15px;
      line-height: 26px;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
    }
    .post-tweet {
      display:flex;
      flex-direction: row;
      height: 120px;
      position: relative;
      .content-wrapper {
        width: 100%;
        height: 100%;
        .avatar {
          position: absolute;
          top: 10px;
          left: 15px;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            filter: brightness(.95);
          }
        }
        ::placeholder {
          position: absolute;
          top: 20px;
          left: 75px;
          font-weight: 500;
          font-size: 18px;
          line-height: 26px;
          color: $lightdark;
        }
        .content {
          padding: 20px 0 0 75px;
          border: none;
          overflow: auto;
          outline: none;
          box-shadow: none;
          resize: none;
          width: 100%;
          font-size: 18px;
          font-weight: 500;
          font-size: 18px;
          line-height: 26px;
        }
        .btn-tweet {
          width: 100%;
          max-width: 64px;
          height: 40px;
          position: absolute;
          bottom: 10px;
          right: 15px;
          background: $orange;
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          border-radius: 100px;
          transition: ease-in 0.2s;
          &:hover {
            background-color: $deeporange;
            box-shadow: 0 0 3px 1px $lightdark;
          }
        }
      }
    }
    .divider {
      min-height: 10px;
      max-height: 10px;
      background-color: $divider;
    }
  }
}
</style>
