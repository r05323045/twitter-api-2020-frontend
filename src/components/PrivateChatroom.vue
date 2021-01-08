<template>
  <div class="chat-room">
    <div class="chat-users">
      <div class="title">
        訊息
        <div class="icon messege"></div>
      </div>
      <div class="list-group" v-if="historyChatUsers.length > 0">
        <div v-for="(user, idx) in historyChatUsers" :key="`${user.id + Math.random()}`" class="list-group-item" @click="controlActive(user, idx)">
          <div v-show="messengeActive[idx]" class="active-bar"></div>
          <div class="avatar" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})" :style="{ background: `url(${user ? user.avatar : ''}) no-repeat center/cover` }"></div>
          <div class="info">  
            <div class="name" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{ user.name }}</div>
            <div class="account" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{ user.account }}</div>
          </div>
          <div class="unread-wrapper" v-if="user.unread > 0">
            <div class="unread">{{ user.unread }}</div>
          </div>
        </div>
      </div>
    </div>
    <PrivateMessengeBoard
      :userChatTo="userChatTo" 
      :messages="histroyMessages" 
      :targetChannel="targetChannel" 
      @sendPrivateMessage="receiveMessage"
    >
    </PrivateMessengeBoard>
  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import chatAPI from '@/apis/chats'
import usersAPI from '@/apis/users'
import PrivateMessengeBoard from '@/components/PrivateMessengeBoard.vue' 
export default {
  components: {
    PrivateMessengeBoard
  },
  data () {
    return {
      messengeActive: [],
      userChatTo: {},
      historyChatUsers: [],
      historyChatUserId: [],
      allHistoryMessages: [],
      histroyMessages: [],
      unreadMessages: [],
      targetChannel: '',
      users: []
    }
  },
  created () {
    this.$bus.$on('updateChatUsers', (message) => {
      this.updateChatUsers(message)
      this.readMessages(this.userChatTo.id)
    })
    return Promise.all([
      this.fetchUsers(),
      this.fetchChatroom()
    ]).then(() => {
        this.messengeActive = new Array(this.historyChatUsers.length).fill(false)
        if (this.$route.query.id) {
          this.userChatTo = this.historyChatUsers.filter(user => user.id === Number(this.$route.query.id))[0]
          const chatToIndex = this.historyChatUsers.map(user => user.id).indexOf(Number(this.$route.query.id))
          this.messengeActive[chatToIndex] = true
        } else {
          this.userChatTo = Object.assign({}, this.historyChatUsers[0] ? this.historyChatUsers[0] : {})
          this.messengeActive[0] = true
        }
        if (this.historyChatUsers.length > 0) {
          this.historyChatUsers[0].unread = 0
          this.targetChannel = Number(this.userChatTo.id) > Number(this.currentUser.id) ? `${this.currentUser.id}_${this.userChatTo.id}` : `${this.userChatTo.id}_${this.currentUser.id}`
          this.histroyMessages = this.allHistoryMessages.filter(message => message.targetChannel === this.targetChannel)
          this.readMessages(this.userChatTo.id)
          this.$socket.emit('private chatroom', this.targetChannel)
        }
    })
  },
  beforeDestroy () {
    this.$socket.emit('leave private chatroom', this.targetChannel)
    this.readMessages(this.userChatTo.id)
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  watch: {
    historyChatUsers () {
    }
  },
  methods: {
    receiveMessage (message) {
      this.allHistoryMessages = [...this.allHistoryMessages, message]
      this.histroyMessages = this.allHistoryMessages.filter(message => message.targetChannel === this.targetChannel)
    },
    controlActive (user, index) {
      this.messengeActive = new Array(this.historyChatUsers.length).fill(false)
      this.messengeActive[index] = true
      this.readMessages(this.userChatTo.id)
      this.userChatTo = Object.assign({}, user)
      this.$socket.emit('leave private chatroom', this.targetChannel)
      this.targetChannel = Number(this.userChatTo.id) > Number(this.currentUser.id) ? `${this.currentUser.id}_${this.userChatTo.id}` : `${this.userChatTo.id}_${this.currentUser.id}`
      this.histroyMessages = this.allHistoryMessages.filter(message => message.targetChannel === this.targetChannel)
      this.readMessages(this.userChatTo.id)
      const chatToIndex = this.historyChatUsers.map(user => user.id).indexOf(user.id)
      this.historyChatUsers[chatToIndex].unread = 0
      this.$socket.emit('private chatroom', this.targetChannel)
    },
    async fetchChatroom () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await chatAPI.getChatRoom()
        this.allHistoryMessages = data.histroy.filter(d => d.type === 'chat' && d.targetChannel !== '0')
        if (this.allHistoryMessages) {
          const chatRelationships = this.allHistoryMessages.map(message => message.targetChannel).map(channel => channel.split('_')).filter(d => d.length > 1).filter(d => d.includes(String(this.currentUser.id)))
          chatRelationships.forEach(relation => {
            this.historyChatUserId.push(relation[0] === String(this.currentUser.id) ? Number(relation[1]) : Number(relation[0]))
          })
        }
        this.historyChatUserId = Array.from(new Set(this.historyChatUserId))
        if (this.$route.query) {
          this.historyChatUserId = this.historyChatUserId.includes(Number(this.$route.query.id)) ? this.historyChatUserId : [...this.historyChatUserId, Number(this.$route.query.id)]
        }
        this.historyChatUsers = this.users.filter(user => this.historyChatUserId.includes(user.id))
        this.historyChatUsers.forEach(user => {
          const channel = Number(user.id) > Number(this.currentUser.id) ? `${this.currentUser.id}_${user.id}` : `${user.id}_${this.currentUser.id}`
          const history = this.allHistoryMessages.filter(message => message.targetChannel === channel)
          if (history.length > 0) {
            history.sort((a, b) => { return a.createdAt < b.createdAt ? 1 : -1 })
            user.lastChat = history[0].createdAt
          } else {
            user.lastChat = Date.now()
          }
          if (history.length > 0) {
            user.unread = history.filter(message => message.isRead === false && message.sendTo === this.currentUser.id).length
          }
        })
        this.historyChatUsers.sort((a, b) => { return a.lastChat < b.lastChat ? 1 : -1 })
        const scroll = this.$refs.boardWrapper
        if (scroll) {
          scroll.scrollTop = scroll.scrollHeight
          scroll.animate({scrollTop: scroll.scrollHeight})
        }
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法連線聊天室，請稍候'
        })
      }
    },
    async fetchUsers () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await usersAPI.getUsers()
        this.users = data
        loader.hide()
        return data
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍候'
        })
      }
    },
    async readMessages (userId) {
      try {
        const { data } = await chatAPI.readMessages({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('updateUnreadMessages')
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法已讀訊息，請稍候'
        })
      }
    },
    async updateChatUsers (message) {
      this.allHistoryMessages = [...this.allHistoryMessages, message]
      if (!this.historyChatUsers.map(user => user.id).includes(message.UserId)) {
        const chatUser = message.User
        chatUser.lastChat = message.createdAt
        chatUser.unread = 0
        this.historyChatUsers = [...this.historyChatUsers, chatUser]
        this.historyChatUsers.sort((a, b) => { return a.lastChat < b.lastChat ? 1 : -1 })
        this.messengeActive = new Array(this.historyChatUsers.length).fill(false)
        const chatToIndex = this.historyChatUsers.map(user => user.id).indexOf(Number(this.userChatTo.id))
        this.messengeActive[chatToIndex] = true
      }
      this.historyChatUsers = this.historyChatUsers.map(user => ({
        ...user,
        unread: message.UserId === user.id ? user.unread += 1 : user.unread
      }))
    }
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightgray: #F5F8FA;
$bitdark: #657786;
$divider: #E6ECF0;
.chat-room {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .chat-users {
    width: 100%;
    max-width: 375px;
    .title {
      width: 100%;
      position: relative;
      text-align: left;
      padding: 15px 0 0 15px; 
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      height: 55px;
      .icon.messege {
        top: 20px;
        right: 15px;
        position: absolute;
        width: 20px;
        height: 18px;
        mask: url(../assets/icon_messege.svg) no-repeat center;
        mask-size: contain;
        background-color: #000000;
      }
    }
    .list-group {
      border: none;
      .list-group-item {
        position: relative;
        border: none;
        border-radius: 0;
        border-top: 1px solid $divider;
        border-bottom: 1px solid $divider;
        height: 71px;
        padding: 10px 15px 10px 15px;
        background: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          backdrop-filter: brightness(.95);
        }
        .active-bar {
          width: 2px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background: $orange;
        }
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
        .info {
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: 28px;
          .name {
            text-align: left;
            margin-right: 10px;
            font-weight: 900;
            font-size: 19px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .account {
            text-align: left;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            vertical-align: bottom;
            height: 24px;
            color: $bitdark;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .unread-wrapper {
          flex-grow: 1;
          .unread {
            margin: auto;
            font-size: 16px;
            font-weight: 700;
            width: 24px;
            height: 24px;
            color: #ffffff;
            border-radius: 30px;
            background-color: $bitdark;
          }
        }
      }
    }
  }
}
</style>
