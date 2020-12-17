<template>
  <div class="recommend-users">
    <div class="title">跟隨誰</div>
    <div class="list-group">
      <div class="list-group-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account">@pizzahut</div>
        </div>
        <button class="btn btn-follow unfollow">正在跟隨</button>
      </div>
      <div v-for="i in 5" :key="i" class="list-group-item">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account">@pizzahut</div>
        </div>
        <button class="btn btn-follow">跟隨</button>
      </div>
    </div>
    <div class="footer">顯示更多</div>
  </div>
</template>

<script>

export default {
  name: 'RecommendUsers'
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$bitdark: #657786;
$divider: #E6ECF0;
.recommend-users {
  width: 100%;
  max-width: 350px;
  max-height: 517px;
  margin: 15px 82px 0 30px;
  border-radius: 14px;
  background: $lightgray;
  .title {
    margin-top: 10px;
    text-align: left;
    padding: 0px 0 0 15px; 
    font-size: 18px;
    line-height: 26px;
    height: 36px;
    font-weight: 700;
  }
  .list-group {
    border: none;
    .list-group-item {
      position: relative;
      border: none;
      border-radius: 0;
      border-top: 1px solid $divider;
      border-bottom: 1px solid $divider;
      height: 70px;
      padding: 10px 15px 0 15px;
      background: none;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        backdrop-filter: brightness(.95);
      }
      .avatar {
        margin-right: 10px;
        height: 50px;
        width: 50px;
        border-radius: 50%;
        background: $bitdark;
        cursor: pointer;
        &:hover {
          filter: brightness(.9);
        }
      }
      .info {
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        .name {
          margin-bottom: 3px;
          font-size: 15px;
          line-height: 15px;
          font-weight: 700;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .account {
          font-size: 15px;
          line-height: 15px;
          font-weight: 700;
          color: $bitdark;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .btn-follow.unfollow {
        width: 100%;
        max-width: 92px;
        position: absolute;
        top: 20px;
        right: 15px;
        height: 30px;
        background: $orange;
        font-size: 15px;
        line-height: 15px;
        font-weight: 700;
        color: #ffffff;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          background-color: $deeporange;
        }
      }
      .btn-follow {
        width: 100%;
        max-width: 62px;
        height: 30px;
        line-height: 15px;
        margin-left: auto;
        border: 1px solid $orange ;
        background: none;
        font-size: 15px;
        font-weight: 700;
        color: $orange;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          box-shadow: 0 0 3px 1px $bitdark;
          background-color: $orange;
          color: #ffffff;
        }
      }
    }
  }
  .footer {
    margin-bottom: auto;
    height: 22px;
    line-height: 22px;
    max-width: 60px;
    margin: 12px 0 12px 15px;
    text-align: left;
    font-weight: normal;
    font-size: 15px;
    color: $orange;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      text-decoration: underline;
      color: $deeporange;
    }
  }
}
</style>
