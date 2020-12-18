<template>
  <div class="tweet-list">
    <div v-for="i in 7" :key="i" class="list-item">
      <div class="avatar"></div>
      <div class="tweet-wrapper">
        <div class="info">
          <div class="name">Pizza Hut</div>
          <div class="account-and-post-time">@pizzahut &bull; 3小時</div>
        </div>
        <div class="content">Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt reprehenderit elit laborum.</div>
        <div class="action">
          <div class="reply-wrapper">
            <div class="icon reply"></div>
            <span class="number">3</span>
          </div>
          <div class="like-wrapper">
            <div class="icon like"></div>
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
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #f6f8fa;
$dark: #2c3e50;
$bitdark: #657786;
$divider: #E6ECF0;
.tweet-list {
  max-height: calc(100vh - 194px);
  overflow-y: scroll;
  width: 100%;
  .list-item {
    padding: 10px 0 10px 0;
    height: 146px;
    border-bottom: 1px solid $divider;
    display: flex;
    flex-direction: row;
    position: relative;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      backdrop-filter: brightness(.95);
    }
    .avatar {
      margin: 3px 0 0 15px;
      height: 50px;
      min-width: 50px;
      border-radius: 100px;
      background: url(https://source.unsplash.com/collection/4389261/100x100) no-repeat center;
      background-size: 100%;
      cursor: pointer;
      &:hover {
        filter: brightness(.9);
      }
    }
    .tweet-wrapper {
      margin-left: 10px;
      .info {
        height: 22px;
        line-height: 22px;
        display: flex;
        flex-direction: row;
        font-size: 15px;
        font-weight: 700;
        .name {
          font-weight: 700;
          margin-right: 5px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .account-and-post-time {
          color: $bitdark;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .content {
        margin-top: 6px;
        font-size: 15px;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        text-align: left;
      }
      .action {
        width: 130px;
        height: 21px;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: $bitdark;
        .icon  {
          max-width: 15px;
          width: 100%;
          height: 100%;
          background-color: $bitdark;
        }
        .icon.reply {
          mask: url(../assets/icon_reply.svg) no-repeat center;
          mask-size: contain;
        }
        .icon.like {
          mask: url(../assets/icon_like.svg) no-repeat center;
          mask-size: contain;
        }
        .reply-wrapper {
          display: flex;
          align-items: center;
          width: 40px;
          margin: 3px 0;
          height: 15px;
          cursor: pointer;
          transition: ease-in 0.2s;
          &:hover {
            .icon {
              background-color:#E0245E;
            }
          }
        }
        .like-wrapper {
          display: flex;
          align-items: center;
          width: 40px;
          margin: 3px 0;
          height: 15px;
          cursor: pointer;
          transition: ease-in 0.2s;
          &:hover {
            .icon.like {
              mask: url(../assets/icon_liked.svg) no-repeat center;
              mask-size: contain;
              background-color: #E0245E;
            }
          }
        }
        .number {
          width: 15px;
          height: 13px;
          margin-left: 10px;
          font-weight: 500;
          font-size: 13px;
          line-height: 13px;
        }
      }
    }
  }
}
</style>
