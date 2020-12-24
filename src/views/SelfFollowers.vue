<template>
  <div class="row page-container">
    <Navbar class="col-3" />
    <SelfUserFollowers :intial-followers="followers"/>
    <RecommendUsers class="col-4" />
  </div>
     
</template>

<script>
import SelfUserFollowers from "./../components/SelfUserFollowers" 
import Navbar from "./../components/Navbar"
import RecommendUsers from "./../components/RecommendUsers"
import UsersAPI from './../apis/users'
import { Toast } from '@/utils/helpers'
export default {
  name: 'SelfFollowers',
  components: {
    Navbar,
    SelfUserFollowers,
    RecommendUsers
  },
  data() {
    return {
      followers: {}
    }
  },
  created() {
    this.fetchFollowers(2)
  },
  methods: {
    async fetchFollowers(userId) {
      try {
        const response = await UsersAPI.getFollowers({ userId })
        console.log('follower response', response )

        // const {name, account, avatar, introduction} = response.data[2].Followers
        // console.log('name', name)
        this.followers = {...response.data[2].Followers }
       

        console.log('response.data[2].Followers[0]',response.data[2].Followers)

        console.log("this.followers", this.followers)

      } catch {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        }) 
      }

    },
  }
}
</script>

<style>
  .page-container {
    /* outline: red solid;   */
    min-width: 1440px;
    margin-top: 15px;
    height: 100%;
  }
  /* .content {
    flex: 1;
  } */
</style>