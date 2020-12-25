<template>
  <div class="row page-container">
    <Navbar class="col-3" />
    <SelfUserFollowers v-show="$route.path === '/user/self/follower'" :initialFollowers="followers" :currentUser="user" />
    <SelfUserFollowers v-show="$route.path === '/user/self/following'" :initialFollowers="followings" :currentUser="user" />
    <RecommendUsers class="col-4" />
  </div>
     
</template>

<script>
import SelfUserFollowers from "./../components/SelfUserFollowers" 
import Navbar from "./../components/Navbar"
import RecommendUsers from "./../components/RecommendUsers"
import UsersAPI from './../apis/users'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  name: 'SelfFollowers',
  components: {
    Navbar,
    SelfUserFollowers,
    RecommendUsers
  },
  data() {
    return {
      followers: [],
      followings: [],
      user: {}
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.$bus.$on('followAction', action => {
      this.followAction(action)
    })
    this.fetchFollowers(this.currentUser.id)
    this.fetchProfile()

  },
  watch: {
    '$route.path': function () {
      this.followers.sort((a, b) => {
        return a.Followship.createdAt < b.Followship.createdAt ? 1 : -1;
      })
      this.followings.sort((a, b) => {
        return a.Followship.createdAt < b.Followship.createdAt ? 1 : -1;
      })
      this.fetchFollowers(this.currentUser.id)
    }
  },
  methods: {
    async fetchProfile () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      const userId = this.currentUser.id
      try {
        const { data } = await UsersAPI.getProfile({userId})
        this.user = data
        this.user.tweets = this.user.tweets.map(tweet => ({
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
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍候'
        })
      }
    },
    async fetchFollowers(userId) {
      try {
        const followerData = await UsersAPI.getFollowers({ userId })
        this.followers = followerData.data[2].Followers
        const followingData = await UsersAPI.getFollowings({ userId })
        this.followings = followingData.data[2].Followings
        this.followers.sort((a, b) => {
          return a.Followship.createdAt < b.Followship.createdAt ? 1 : -1;
        })
        this.followings.sort((a, b) => {
          return a.Followship.createdAt < b.Followship.createdAt ? 1 : -1;
        })
      } catch {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        }) 
      }

    },
    followAction () {
      this.fetchFollowers(this.currentUser.id)
      this.fetchProfile()
    }
  }
}
</script>

<style>
  .page-container {
    /* outline: red solid;   */
    min-width: 1440px;
    height: 100%;
  }
  /* .content {
    flex: 1;
  } */
</style>