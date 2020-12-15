<template>
  <div class="recommend-users">
    <div class="container list-group list-group-flush">
      <div class="list-group-item title">跟隨誰</div>
      <div class="list-group-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account">@pizzahut</div>
        </div>
        <button class="btn btn-follow">正在跟隨</button>
      </div>
      <div v-for="i in 5" :key="i" class="list-group-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account">@pizzahut</div>
        </div>
        <button class="btn btn-follow unfollow">跟隨</button>
      </div>
      <div class="list-group-item more">顯示更多</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RecommendUsers'
}

</script>

<style lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
$lightgray: #f6f8fa;
.recommend-users {
  padding: 0 30px 30px 30px;
  border-left: 2px solid #eee;
  .container {
    margin-left: 0;
    max-width: 400px;
    width: 80%;
    border-radius: 10px;
    .title {
      line-height: 50%;
      text-align: left;
      font-weight: 700;
      font-size: 14px;
    }
    .list-group-item {
      background: $lightgray;
      display: flex;
      flex-direction: row;
      align-items: center;
      .avatar {
        margin-right: 15px;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: #919191;
      }
      .info {
        display: flex;
        flex-direction: column;
        .name {
          font-size: 12px;
          font-weight: 700;
        }
        .account {
          font-size: 10px;
          font-weight: 700;
          color: #919191;
        }
      }
      .btn-follow {
        height: 30px;
        margin-left: auto;
        background: $orange;
        font-size: 12px;
        font-weight: 700;
        color: #ffffff;
        border-radius: 30px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
        }
      }
      .btn-follow.unfollow {
        height: 30px;
        margin-left: auto;
        border: 1px solid $orange ;
        background: none;
        font-size: 12px;
        font-weight: 700;
        color: $orange;
        border-radius: 30px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $orange;
          color: #ffffff;
        }
      }
    }
    .more {
      line-height: 50%;
      text-align: left;
      font-weight: 700;
      font-size: 12px;
      color: $orange;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        text-decoration: underline;
        color: $deeporange;
      }
    }
  }
}
</style>
