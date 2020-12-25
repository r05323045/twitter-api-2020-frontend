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
      user: {},
      topUsers: []
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created() {
    this.$bus.$on('followAction', action => {
      if (this.$route.path.indexOf('/self') > 0)
      this.followAction(action)
    })
    this.fetchTopUsers ()
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
        if (this.user.following.rows.map(d => d.followerId).includes(userId)) {
          this.user.following.rows = this.user.following.rows.filter(d => d.followerId !== userId)
          this.user.following.count = this.user.following.count - 1
        }
        if (this.user.follower.rows.map(d => d.followerId).includes(userId)) {
          this.user.follower.rows = this.user.follower.rows.filter(d => d.followerId !== userId)
          this.user.follower.count = this.user.follower.count - 1
        }
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
    async fetchTopUsers () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await UsersAPI.getTopUsers()
        this.topUsers = data.users.map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          account: user.account,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        })).filter(user => user.id !== this.currentUser.id)
        loader.hide()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法為你推薦追蹤，請稍候'
        })
      }
    },
    async fetchFollowers(userId) {
      try {
        const followerData = await UsersAPI.getFollowers({ userId })
        this.followers = followerData.data[1].Followers.filter(d => d.id !== userId)
        this.followers.forEach(d => {
          this.topUsers.forEach(r => {
            if (d.id === r.id) {
              d.isFollowed = r.isFollowed
            }
          })
        })
        const followingData = await UsersAPI.getFollowings({ userId })
        this.followings = followingData.data[1].Followings.filter(d => d.id !== userId)
        this.followings.forEach(d => {
          this.topUsers.forEach(r => {
            if (d.id === r.id) {
              d.isFollowed = r.isFollowed
            }
          })
        })
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
      this.fetchTopUsers ()
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