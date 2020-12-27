<template>
  <div class="messenge-board" v-if="userChatTo">
    <div class="top-wrapper">
      <div v-show="false" class="info">
        <div class="name">{{ userChatTo.name }}</div>
        <div class="account">{{ userChatTo.account }}</div>
      </div>
      <div class="public-text">
        公開聊天室
      </div>
    </div>
    <div class="board-wrapper">
      <div class="messages">
        <div v-for="(message, index) in messages" :key="`msg-${index}`">
          <div class="broacast-message-wrapper" v-if="message.type === 'userComein'">
            <div class="broacast-message">{{ message.message }}</div>
          </div>
          <div class="other message" v-if="message.type !== 'userComein' && currentUser.id !== message.id">
            <div class="avatar" :style="{ background: `url(${message.avatar}) no-repeat center/cover` }"></div>
            <div class="wrapper">
              <div class="text">{{ message.message }}</div>
              <div class="time">{{ message.createdAt | fromNow }}</div>
            </div>
          </div>
          <div class="self message" v-if="message.type !== 'userComein' && currentUser.id === message.id">
            <div class="text">{{ message.message }}</div>
            <div class="time">{{ message.createdAt | fromNow }}</div>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <div class="text-wrapper">
        <input v-model="message" class="text" placeholder="輸入訊息..." onfocus="this.placeholder = ''" onblur="this.placeholder = '輸入訊息...'" />
        <div class="icon-wrapper" type="submit" @click="sendMessage">
          <div class="icon send"></div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import chatAPI from '@/apis/chats'
import { mapState } from 'vuex'
export default {
  props: {
    userChatTo: {
      type: Object
    }
  },
  data() {
    return {
      onlineNumber: '',
      newChatter: '',
      broacastMessages: [],
      selfMessages: [],
      otherMessages:[],
      name: '',
      message: '',
      messages: [],
    }
  },
  created () {
    this.$socket.emit('chatting', { ...this.currentUser, createdAt: new Date(), type: 'userComein' })
  },
  beforeDestroy () {
    this.leaveChatroom()
  },
  Destroy () {
    window.removeEventListener('beforeunload', this.leaveChatroom())
  },
  watch: {
    messages () {
      const scroll = document.querySelector('.board-wrapper')
      scroll.scrollTop = scroll.scrollHeight
      scroll.animate({scrollTop: scroll.scrollHeight})
      this.$emit('someoneCommein')
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    sendMessage(e) {
      e.preventDefault()
      if (this.message === '') {
        Toast.fire({
          icon: 'error',
          title: '請輸入訊息'
        })
      }
      this.$socket.emit('send message', {id: this.currentUser.id, avatar: this.currentUser.avatar, message: this.message, createdAt: new Date(), type: 'chat'})
      this.message = ''
      const scroll = document.querySelector('.board-wrapper')
      scroll.scrollTop = scroll.scrollHeight
      scroll.animate({scrollTop: scroll.scrollHeight})
    },
    async leaveChatroom () {
      try {
        const { data } = await chatAPI.deleteChatRoom()
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    window.addEventListener('beforeunload', this.leaveChatroom())
    this.$socket.on('msg', (data) => {
      this.messages = [...this.messages, {id: data.id, avatar: data.avatar, message: data.message, createdAt: data.createdAt, type: data.type}]
      this.messages.sort((a, b) => {
        return a.createdAt > b.createdAt ? 1 : -1;
      })
    }),
    this.$socket.on('newclientlogin', (data) => {
      console.log(data)
      this.messages = [...this.messages, {id: data.id, avatar: data.avatar, message: data.message, createdAt: data.createdAt, type: data.type}]
      this.messages.sort((a, b) => {
        return a.createdAt > b.createdAt ? 1 : -1;
      })
    })
    this.$socket.on('online', (data) => {
      this.onlineNumber = data
    })
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$bitdark: #657786;
$divider: #E6ECF0;
.messenge-board {
  height: 100%;
  width: 100%;
  border-left: 1px solid $divider;
  position: relative;
  .top-wrapper {
    position: absolute;
    top: 0;
    height: 55px;
    width: 100%;
    text-align: left;
    .info {
      margin: 6px 0 0 15px;
      position:relative;
      .name {
        font-weight: 900;
        font-size: 19px;
        line-height: 28px;
      }
      .account {
        position: absolute;
        top: 23px;
        font-weight: 500;
        font-size: 13px;
        color: $bitdark;
      }
    }
    .public-text {
      width: 100%;
      height: 100%;
      text-align: left;
      padding: 15px 0 0 15px;
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
    }
  }
  .board-wrapper {
    border-top: $divider 1px solid;
    position: absolute;
    top: 55px;
    width: 100%;
    height: calc(100vh - 110px);
    padding: 15px;
    overflow-y: scroll;
    .broacast-message-wrapper {
      display:flex;
      flex-direction: column;
      .broacast-message {
        width: 100%;
        margin: 10px auto;
        padding: 0 15px;
        width: auto;
        border-radius: 100px;
        vertical-align: middle;
        background: #f0f0f0;
        font-size: 15px;
        height: 22px;
        line-height: 22px;
        vertical-align: middle;
        font-weight: 700;
        color: $bitdark;
      }
    }
    .messages {
      width: 100%;
      height: 100%;
      position: relative;
      .message {
        margin: 10px 0;
        width: 100%;
        font-weight: 500;
        font-size: 15px;
        line-height: 22px;
      }
      .message.other {
        display: flex;
        flex-direction: row;
        .avatar {
          margin-right: 10px;
          height: 50px;
          width: 50px;
          border-radius: 50%;
          cursor: pointer;
          &:hover {
            filter: brightness(.9);
          }
        }
        .wrapper{
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            max-width: 300px;
            min-height: 40px;
            background: #f0f0f0;
            padding: 0 15px;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;
          }
          .time {
            margin-left: 10px;
            font-size: 13px;
            text-align: left;
            color: $bitdark;
          }
        }
      }
      .message.self {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        .text {
          max-width: 300px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 15px;
          min-height: 40px;
          background: $orange;
          color: #fff;
          border-top-left-radius: 30px;
          border-top-right-radius: 30px;
          border-bottom-left-radius: 30px;
        }
        .time {
          margin-right: 10px;
          font-size: 13px;
          text-align: right;
          color: $bitdark;
        }
      }
    }
  }
  .text-wrapper {
    position: absolute;
    bottom: 0;
    border-top: $divider 1px solid;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    .text {
      margin-left: 15px;
      padding: 15px;
      border-radius: 100px;
      border: none;
      height: 36px;
      width: 100%;
      background: $lightgray;
      &:focus {
        outline: none;
      }
      ::placeholder {
        color: $bitdark
      }
    }
    .icon-wrapper {
      height: 36px;
      width: 72px;
      display: flex;
      align-items: center;
      .icon.send {
        margin: auto;
        width: 20px;
        height: 20px;
        mask: url(../assets/icon_send.svg) no-repeat center;
        mask-size: contain;
        background-color: $orange;
        cursor: pointer;
      }
    }
  }
}
</style>
