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
      <div class="online-numbers">線上人數{{ onlineNumber }}</div>
      <div class="broacast-message" v-for="(broacast, index) in broacastMessages" :key="`broadcast-${index}`">{{ broacast }}</div>
      <div class="messages">
        <div class="self-message" v-for="(msg, index) in selfMessages" :key="`self-${index}`">
          <span class="font-weight-bold">{{ msg.message }}</span>
          <span class="font-weight-bold">{{ msg.createdAt }}</span>
        </div>
        <div class="other-message"  v-for="(msg, index) in otherMessages" :key="`other-${index}`">
          <span class="font-weight-bold">{{ msg.user }}</span>：
          <span class="font-weight-bold">{{ msg.message }}</span>
          <span class="font-weight-bold">{{ msg.createdAt }}</span>
        </div>
      </div>
      <div class="messenge-wrapper"></div>
      <form @submit.prevent="sendMessage">
        <div class="text-wrapper">
          <input v-model="message" class="text" placeholder="輸入訊息..." onfocus="this.placeholder = ''" onblur="this.placeholder = '輸入訊息...'" />
          <div class="icon-wrapper" type="submit" @click="accessChatroom">
            <div class="icon send"></div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import chatAPI from '@/apis/chat'
import { Toast } from '@/utils/helpers'
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
      socket : io('localhost:3000')
    }
  },
  created () {
    this.socket.emit('chatting', {
      user: this.currentUser.name
    })
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit('send message', {id: this.currentUser.id, avatar: this.currentUser.avatar, message: this.message, createdAt: new Date.now()})
      this.message = ''
    },
    async fetchChatroom () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await chatAPI.getChatRoom()
        console.log(data)
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得訊息，請稍候'
        })
      }
    },
    async accessChatroom () {
      try {
        const { data } = await chatAPI.postChatRoom()
        console.log(data)
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法進入聊天室'
        })
      }
    },
  },
  mounted() {
    this.socket.on('msg', (data) => {
      this.messages = [...this.messages, {id: data.id, avatar: data.avatar, message: data.message, createdAt: data.createdAt}]
      this.selfMessages = this.messages.filter(d => { d.id === this.currentUser.id })
      this.otherMessages = this.messages.filter(d => { d.id !== this.currentUser.id })
    }),
    this.socket.on('newclientlogin', (data) => {
      this.broacastMessages = [...this.broacastMessages, data]
    })
    this.socket.on('online', (data) => {
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
    height: calc(100vh - 55px);
    .messages {
      width: 100%;
      height: 100%;
      height: calc(100vh - 110px);
      .self-message {

      }
      .other-message {
        
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
}
</style>
