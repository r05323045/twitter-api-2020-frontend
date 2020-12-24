<template>
  <div class="row page-container">
    <Navbar class="col-3" />
    <SelfUserFollowers 
    :initial-followings="followings"/>
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
  data () {
    return {
      followings: {},
    }
  },
  created(){
    this.fetchFollowings(2)
    
  },
  methods: {
    async fetchFollowings(userId) {
      try {
        const response = await UsersAPI.getFollowings( {userId} ) 

        console.log('response', response)

        // const {name , account, avatar } = response.data[2].Followings

        this.followings = {...response.data[2].Followings}

        

        console.log('response.data[2].Followings[0]',response.data[2].Followings)

        console.log("this.followings", this.followings)

      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得資料，請稍後再試'
        }) 
      }
    }
  }
}
</script>

<style>
  .page-container {
    /* outline: red solid;   */
    min-width: 1440px;
    margin-top: 15px;
  }
  /* .content {
    flex: 1;
  } */
</style>