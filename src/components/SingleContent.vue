<template>
  <div class="reply-main" v-if="tweet && replies && likes">
    <div class="upper">
      <img class="arrow" src="./../asset/Vector@2x.png" alt="" @click="$router.go(-1)">
      <span>推文</span>
    </div>
    <hr>
    <div class="self-content">
      <div class="self-info">
        <img class="self-photo" @click="$router.push(`/user/other/${tweet.User ? tweet.User.id : '/'}`).catch(()=>{})" :src="tweet.User ? tweet.User.avatar : '' " alt="">
        <div class="wrap">
          <span class="name" @click="$router.push(`/user/other/${tweet.User ? tweet.User.id : '/'}`).catch(()=>{})">{{tweet.User ? tweet.User.name : ''}}</span>
          <span class="account" @click="$router.push(`/user/other/${tweet.User ? tweet.User.id : '/'}`).catch(()=>{})">{{tweet.User ? tweet.User.account : ''}}</span>
        </div>
      </div>   
      <p class="tweet-content">{{tweet.description}}</p>
      <span class="time">{{tweet.createdAt | fromNow}}</span>
    </div>
    <hr>
    <div class="counts">
      <span class="reply-counts">{{replies.count}} 回覆</span>
      <span class="like-counts">{{likes.count}} 喜歡次數</span>
    </div>
    <hr>
    <div class="icons">
      <img class="conversation" src="./../asset/conversation@2x.png" alt="" @click="afterClickNewReply">
      <img v-if="likes.rows" @click="likeTweet(tweet.id)" v-show="!likes.rows.map(like => like.UserId).includes(this.currentUser.id)" class="heart" src="./../asset/heart@2x.png" alt="" >
      <div v-if="likes.rows" @click="unlikeTweet(tweet.id)" v-show="likes.rows.map(like => like.UserId).includes(this.currentUser.id)" class="icon heart liked"></div>
    </div>
    
    <div class="replies">
      <div class="single-reply" v-for="(row, index) in replies.rows" :key="`reply_${index}`">  
        <img :src="row.User ? row.User.avatar : ''" @click="$router.push(`/user/other/${row.User ? row.User.id : '/'}`).catch(()=>{})">
        <div class="reply-content">
          <div class="title">
            <span class="name" @click="$router.push(`/user/other/${row.User ? row.User.id : '/'}`).catch(()=>{})">{{row.User ? row.User.name : ''}}</span>
            <span class="account" @click="$router.push(`/user/other/${row.User ? row.User.id : '/'}`).catch(()=>{})">{{row.User ?  row.User.account : ''}}</span>
            <span class="time">・{{row.createdAt | fromNow}}</span>
          </div>
          <span class="to-whom">回覆 <span class="receiver">{{tweet.User ? tweet.User.account : ''}}</span></span>
          <p class="reply-item">{{row.comment}}</p>
        </div>
      </div>
    </div>

    <ModalForReplyTweet :tweet="tweet" v-if='showNewReplyModal' @replyTweet="replyTweet" @after-click-cross="afterClickCross" />
  </div>
</template>
<script> 
import ModalForReplyTweet from './../components/ModalForReplyTweet'
import likesAPI from '@/apis/likes'
import tweetsAPI from '@/apis/tweets'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  components: {
    ModalForReplyTweet
  }, 
  data() {
    return {
      showNewReplyModal: false,
      tweetId : '',
      tweet: {},
      replies: {},
      likes: {},
      comments: {}
    }
  },
  watch: {
    '$route.params.id': function() {
      this.tweetId = this.$route.params.id
      this.fetchTweet(this.tweetId)
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  mounted () {
    this.tweetId = this.$route.params.id
    this.fetchTweet(this.tweetId)
  },
  methods: {
   afterClickCross() {
      this.showNewReplyModal = false
    },
    afterClickNewReply() {
      this.showNewReplyModal = true
    },

    async fetchTweet(tweetId) {
      try{
        const data = await tweetsAPI.getTweet({ tweetId })
        this.tweet =  { ...data.data.tweet }
        this.replies =  { ...data.data.replies }
        this.replies.rows.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        })
        this.likes =  { ...data.data.likes }
      } catch(error) {
        Toast.fire({
            icon: 'error',
            title: '無法取得資料，請稍後再試'
        })
      }
    },
    async replyTweet (comment) {
      const tweetId = this.$route.params.id
      try {
        if (!comment) {
          Toast.fire({
            icon: 'error',
            title: '請輸入內容'
          })
          return
        }

        const { data } = await tweetsAPI.postReply( {tweetId , comment} )
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        
        if (data.tweet.UserId > 0 && data.tweet.UserId !== this.currentUser.id) {
          this.$socket.emit('personal notification', {
            senderId: this.currentUser.id,
            titleData: `你的貼文有新的回覆`,
            contentData: comment,
            url: `/reply_list/${tweetId}`,
            type: 'reply',
            recipientId: data.tweet.UserId
          })
        }
        this.replies = { ...this.replies, userId: this.currentUser.id, comment: comment}
        if (this.replies.rows.length > 0) {
          this.replies.rows = this.replies.rows.filter(r => r.UserId !== this.currentUser.id)
        }
        console.log(this.replies)
        this.$socket.emit('reply notification', this.replies)

        await this.fetchTweet(this.tweetId)
        this.showNewReplyModal = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法回覆，請稍候'
        })
      }
    },
    async likeTweet (tweetId) {
      try {
        const { data } = await likesAPI.likeTweet({ tweetId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('tweetAction', { type: 'like', tweetId: tweetId })

        if (data.tweet.UserId > 0 && data.tweet.UserId !== this.currentUser.id) {
          this.$socket.emit('personal notification', {
            senderId: this.currentUser.id,
            titleData: `${this.currentUser.name} 喜歡你的貼文`,
            url: `/reply_list/${tweetId}`,
            type: 'like',
            recipientId: data.tweet.UserId
          })
        }

      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法按讚推文，請稍後再試'
        })
      }
      await this.fetchTweet(this.tweetId)
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
      await this.fetchTweet(this.tweetId)
    }
  },
}
</script>

<style lang='scss'>
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$bitdark: #657786;
$divider: #E6ECF0;
  .reply-main {
    overflow-y: scroll;
    width: 600px;
    height: 100%; 
    border-right: 1px solid #E6ECF0;
    border-left: 1px solid #E6ECF0;
    display: flex;
    flex-direction: column;
    padding: 0;    
    .upper {
      // outline: red solid;
      height: 55px;
      display: flex;
      flex-direction: row;
      .arrow {
        cursor: pointer;
        width: 17px;
        height: 14px;
        margin: 20px 43px 20px 20px;
      }
      span {
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 55px;
        align-self: center;
      }
    }
    hr {margin: 0;}
    .self-content {
      width: 100%;
      // outline: red solid;
      display: flex;
      flex-direction: column;
      .self-info {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        // outline: red solid;
        .self-photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 13px 10px 15px 15px;
          object-fit: cover;
          cursor: pointer;
          &:hover {
            filter: brightness(.9);
          }
          // outline: red solid;
        }
        .wrap {
          // outline: red solid;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin: 18px 0 0 0;
          height: 44px;

          .name {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            // height: 22px;
          }
          .account {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            color: $bitdark;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
            // height: 22px;
          }
        }
      }
      .tweet-content {
        width: 510px;
        height: auto;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 23px;
        line-height: 34px;
        text-align: start;
        margin: 0 75px 0 15px;
      }
      .time {
        width: 600px;
        height: auto;
        // outline: red solid;
        font-family: Noto Sans TC;
        font-style: normal;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
        color: #657786;
        text-align: start;
        margin: 15px;
      }
    }
    .counts {
      // outline: red solid;
      margin: 20px;
      text-align: start;
      font-family: Noto Sans TC;
      font-style: normal;
      font-weight: bold;
      font-size: 19px;
      line-height: 28px;
      .like-counts {
        margin-left: 20px;
      }
    }
    .icons {
      display: flex;
      flex-direction: row;
      
      // outline: red solid;
      margin: 21px 17px 21px 17px;
      .heart, .conversation {
        height: 25px;
        width: 25px;
        // outline: red solid;
        margin: 0 155px 0 0;
        cursor: pointer;
      }
      .heart {
        margin-right: 377px;
        cursor: pointer;
      }
      .icon.liked {
        width: 100%;
        min-height: 25px;
        min-width: 25px;
        mask: url(../assets/icon_liked.svg) no-repeat center;
        mask-size: contain;
        background-color:#E0245E;
      }
    }
    .replies {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      background: #FFFFFF;
      border-top: 1px solid #E6ECF0;
      border-bottom: 1px solid #E6ECF0;
      // box-sizing: border-box;
      .single-reply {
        display:flex;
        flex-direction: row;
        border-bottom: 1px solid #E6ECF0;
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
          object-fit: cover;
          margin: 18px 10px 37px 15px; 
          cursor: pointer;
          &:hover {
            filter: brightness(.9);
          }
        }
        .reply-content {
          margin: 15px 0 0 0;
          text-align: start;
          .title {
            margin-bottom: 4px;
            .name {
              margin-right: 5px;
              font-weight: 500;
              cursor: pointer;
              &:hover {
                font-weight: 500;
                text-decoration: underline;
              }
            }
            .account {
              color: $bitdark;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .time {
              font-weight: 500;
              font-size: 15px;
              line-height: 22px;
              color: #657786;
              text-align: start;
            }
            
          }
          .to-whom {
            margin-bottom: 5px;
            text-align: start;
            margin-bottom: 23px;
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 13px;
            line-height: 13px;
            .receiver {
              color: #FF6600;
            }
          }
          .reply-item {
            margin: 5px 15px 15px 0;
            font-style: normal;
            font-weight: normal;
            font-size: 15px;
            line-height: 22px;
          }
        }
      }
    }
    
  
  }
</style>