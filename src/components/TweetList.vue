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
        <div class="action">
          <div class="comment">
            <i class="fas fa-comment"></i>
            <span class="number">3</span>
          </div>
          <div class="like">
            <i class="fas fa-heart"></i>
            <span class="number">10</span>
          </div>
        </div>
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
$lightdark: #919191;
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
      background: $lightdark;
    }
    .tweet-wrapper {
      .info {
        display: flex;
        flex-direction: row;
        font-size: 10px;
        font-weight: 700;
        color: $lightdark;
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
      .action {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        font-size: 12px;
        color: $lightdark;
        font-weight: 500;
        .fas  {
          color: #ffffff;
          text-shadow: -1px 0 $lightdark, 0 1px $lightdark, 1px 0 $lightdark, 0 -1px $lightdark;
        }
        .like {
          cursor: pointer;
          margin-left: 30px;
          transition: ease-in 0.2s;
          &:hover {
            .fas {
              color: $deeporange;
              text-shadow: -1px 0 #ffffff, 0 1px  #ffffff, 1px 0  #ffffff, 0 -1px #ffffff;
            }
          }
        }
        .comment {
          cursor: pointer;
          transition: ease-in 0.2s;
          &:hover {
            .fas {
              color: $lightdark;
              text-shadow: -1px 0 #ffffff, 0 1px  #ffffff, 1px 0  #ffffff, 0 -1px #ffffff;
            }
          }
        }
        .number {
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
