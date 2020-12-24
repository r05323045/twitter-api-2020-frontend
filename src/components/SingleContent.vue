<template>
  <div class="main">
    <div class="upper">
      <img class="arrow" src="./../asset/Vector@2x.png" alt="">
      <span>推文</span>
    </div>
    <hr>
    <div class="self-content">
      <div class="self-info">
        <img class="self-photo" :src=" tweet.User.avatar " alt="">
        <div class="wrap">
          <span class="name">{{tweet.User.name}}</span>
          <span class="account">{{tweet.User.account}}</span>
        </div>
      </div>   
      <p class="tweet-content">{{tweet.description}}</p>
      <span class="time">{{tweet.createdAt}}</span>
    </div>
    <hr>
    <div class="counts">
      <span class="reply-counts">{{replies.count}}回覆</span>
      <span class="like-counts">{{likes.count}} 喜歡次數</span>
    </div>
    <hr>
    <div class="icons">
      <img class="conversation" src="./../asset/conversation@2x.png" alt="" @click="afterClickNewReply">
      <img class="heart" src="./../asset/heart@2x.png" alt="">
    </div>
    
    <div class="replies">
      <div class="single-reply" v-for="comment in comments" :key="comment.id">  
        <img :src="comment.User.avatar" alt="">
        <div class="reply-content">
          <div class="title">
            <span class="name">{{comment.User.name}}</span>
            <span class="account">{{comment.User.account}}</span>
            <span class="time">・{{comment.createdAt}}</span>
          </div>
          <span class="to-whom">回覆 {{tweet.User.account}}</span>
          <p class="reply-item">{{comment.comment}}</p>
        </div>
      </div>
    </div>

    <ModalForReplyTweet v-if='showNewReplyModal' @after-click-cross="afterClickCross" />
  </div>
</template>
<script> 
import ModalForReplyTweet from './../components/ModalForReplyTweet'
export default {
  components: {
    ModalForReplyTweet
  }, 
  data() {
    return {
      showNewReplyModal: false,
      tweet: { ...this.initialTweet },
      replies: {...this.initialReplies},
      likes: {...this.initialLikes},
      comments: {...this.initialReplies.rows}
    }
  },  
  props: {
    initialTweet: {
      type: Object,
      required: true
    },
    initialReplies: {
      type: Object,
      required: true
    },
    initialLikes: {
      type: Object,
      required: true
    },
  },
  methods: {
   afterClickCross() {
      this.showNewReplyModal = false
    },
    afterClickNewReply() {
      this.showNewReplyModal = true
      console.log('afterClickReplyTweet')
    }
  },
}
</script>

<style lang='scss'>
  .main {
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
            // height: 22px;
          }
          .account {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
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
      }
      .heart {
        margin-right: 377px;
      }
    }
    .replies {
      overflow-y: scroll;
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
          margin: 18px 10px 37px 15px; 
        }
        .reply-content {
          margin: 15px 0 0 0;
          text-align: start;
          .title {
            margin-bottom: 4px;
            .name {
              margin-right: 5px;
            }
            
          }
          .to-whom {
            margin-bottom: 5px;
          }
          .reply-item {
            margin-bottom: 15px;
          }
        }
      }
    }
    
  
  }
</style>