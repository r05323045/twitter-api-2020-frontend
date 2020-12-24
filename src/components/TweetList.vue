<template>
  <div class="tweet-list" v-if="tweets">
    <div v-for="tweet in tweets" :key="`${tweet.id}-${Math.random()}`" class="list-item" @click="$router.push(`/reply_list/${tweet.id}`)">
      <div class="avatar" :style="{ background: `url(${tweet.avatar}) no-repeat center/cover` }" @click="$router.push(`/user/other/${tweet.userId}`).catch(()=>{})"></div>
      <div class="tweet-wrapper">
        <div class="info">
          <div class="name" @click="$router.push(`/user/other/${tweet.userId}`).catch(()=>{})">{{ tweet.name }}</div>
          <div class="account-and-post-time">
            <span class="account" @click="$router.push(`/user/other/${tweet.userId}`).catch(()=>{})">{{ tweet.account }} </span>&bull;
            <span>{{ tweet.createdAt | fromNow }}</span>
          </div>
        </div>
        <div class="content">{{ tweet.description}}</div>
        <div class="action">
          <div class="reply-wrapper">
            <div class="icon reply"></div>
            <span class="number">{{ tweet.replyTweetCount }}</span>
          </div>
          <div class="like-wrapper">
            <div v-show="!tweet.isLiked" class="icon like" @click="likeTweet(tweet.id)"></div>
            <div v-show="tweet.isLiked" class="icon like liked" @click="unlikeTweet(tweet.id)"></div>
            <span class="number">{{ tweet.likeTweetCount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import likesAPI from '@/apis/likes'
import { Toast } from '@/utils/helpers'

export default {
  name: 'TweetList',
  props: {
    tweets: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    async likeTweet (tweetId) {
      try {
        const { data } = await likesAPI.likeTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('tweetAction', { type: 'like', tweetId: tweetId})
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚推文，請稍後再試'
        })
      }
    },
    async unlikeTweet (tweetId) {
      try {
        const { data } = await likesAPI.unlikeTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('tweetAction', { type: 'unlike', tweetId: tweetId})
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取消按讚，請稍後再試'
        })
      }
    }
  }
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
            .account {
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
      .content {
        height: 66px;
        overflow: hidden;
        margin: 6px 15px 0 0;
        font-size: 15px;
        font-weight: 500;
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
        .icon.like.liked {
          mask: url(../assets/icon_liked.svg) no-repeat center;
          mask-size: contain;
          background-color:#E0245E;
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
              background-color: $orange;
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
              background-color: $orange;
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
