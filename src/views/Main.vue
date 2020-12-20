<template>
  <div class="main">
    <Navbar></Navbar>
    <div class="container">
      <div class="title">首頁</div>
      <div class="post-tweet">
        <div class="avatar" @click="$router.push('/user/self')" :style="{ background: `url(${currentUser.avatar}) no-repeat center/cover` }"></div>
        <textarea class="content" placeholder="有什麼新鮮事？"></textarea>
        <button class="btn btn-tweet">推文</button>
      </div>
      <div class="divider"></div>
      <TweetList></TweetList>
    </div>
    <RecommendUsers></RecommendUsers>
  </div>
  
  
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RecommendUsers from '@/components/RecommendUsers.vue'
import TweetList from '@/components/TweetList.vue'
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
    .divider {
      height: 10px;
      background-color: $divider;
    }
  }
}
</style>
