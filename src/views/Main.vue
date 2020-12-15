<template>
  <div class="main row">
    <Navbar class="col-3"></Navbar>
    <div class="col-5 container">
      <div class="title">首頁</div>
      <hr>
      <div class="post-tweet">
        <div class="avatar"></div>
        <textarea class="content" placeholder="有什麼新鮮事？"></textarea>
        <button class="btn btn-tweet">推文</button>
      </div>
      <TweetList></TweetList>
    </div>
    <RecommendUsers class="col-4"></RecommendUsers>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RecommendUsers from '@/components/RecommendUsers.vue'
import TweetList from '@/components/TweetList.vue'
export default {
  name: 'Main',
  components: {
    Navbar,
    RecommendUsers,
    TweetList
  }
}

</script>

<style lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
.main {
  height: 100%;
  width: 100%;
  padding-top: 30px;
  .col-5.container {
    padding: 0;
    .title {
      height: 1rem;
      line-height: 1rem;
      padding: 15px;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
    }
    .post-tweet {
      display:flex;
      flex-direction: row;
      height: 150px;
      border-bottom: #eee 10px solid;
      position: relative;
      .avatar {
        margin: 0 15px;
        height: 40px;
        width: 40px;
        min-height: 40px;
        min-width: 40px;
        border-radius: 50%;
        background: #919191;
      }
      .content {
        padding-top: 10px;
        border: none;
        overflow: auto;
        outline: none;
        box-shadow: none;
        resize: none;
        width: 100%;
      }
      ::placeholder {
        font-size: 16px;
        font-weight: 500;
        color: #919191;
      }
      .btn-tweet {
        position: absolute;
        bottom: 15px;
        right: 15px;
        background: $orange;
        font-size: 14px;
        font-weight: 700;
        color: #ffffff;
        width: 60px;
        border-radius: 30px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
        }
      }
    }

  }
}
</style>
