<template>
  <div class="tweet-list">
    <div v-for="i in 6" :key="i" class="list-item">
      <div class="avatar"></div>
      <div class="tweet-wrapper">
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account">@pizzahut</div> &bull;
          <div class="time">3小時</div>
        </div>
        <div class="content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TweetList'
}

</script>

<style lang="scss">
$orange: #f46524;
$deeporange: #F34A16;
$lightgray: #f6f8fa;
$dark: #2c3e50;
.tweet-list {
  width: 100%;
  .list-item {
    display: flex;
    flex-direction: row;
    padding: 15px;
    border-bottom: #eee solid 1px;
    .avatar {
      margin-right: 15px;
      height: 40px;
      min-width: 40px;
      border-radius: 50%;
      background: #919191;
    }
    .tweet-wrapper {
      .info {
        display: flex;
        flex-direction: row;
        font-size: 10px;
        font-weight: 700;
        color: #919191;
        .name {
          font-size: 12px;
          font-weight: 700;
          margin-right: 5px;
          color: $dark;
        }
        .account {
          margin-right: 5px;
        }
        .time {
          margin-left: 5px;
        }
      }
      .content {
        margin-top: 5px;
        font-size: 12px;
        text-align: left;
      }
    }
  }
}
</style>
