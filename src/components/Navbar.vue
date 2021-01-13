<template>
  <div class="nav flex-column">
    <div class="logo" @click="currentUser.role === 'admin' ? $router.push('/admin/main').catch(()=>{}) : $router.push('/').catch(()=>{})">
      <div class="icon logo"></div>
    </div>
    <div class="nav-item-wrapper">
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/').catch(()=>{})" :class="{ active: $route.path === '/main' }">
        <div class="icon index"></div>
        首頁
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/user/self').catch(()=>{})" :class="{ active: $route.path === '/user/self' }">
        <div class="icon user"></div>
        個人資料
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/notification').catch(()=>{})" :class="{ active: $route.path === '/notification' }">
        <div v-if="countUnreadNoti > 0" class="unread-noti">{{ countUnreadNoti }}</div>
        <div class="icon noti"></div>
        通知
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/chat').catch(()=>{})" :class="{ active: $route.path === '/chat' }">
        <img class="icon msg-noti" src="../assets/icon_msg_noti.svg">
        公開聊天室
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/private').catch(()=>{})" :class="{ active: $route.path === '/private' }">
        <div v-if="countUnreadMessages > 0" class="unread-noti">{{ countUnreadMessages }}</div>
        <div class="icon messenge"></div>
        私人訊息
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item" @click="$router.push('/setting').catch(()=>{})" :class="{ active: $route.path === '/setting' }">
        <div class="icon cog"></div>
        設定
      </div>
      <div v-if="$route.path.indexOf('admin') < 0" class="nav-item">
        <button class="btn-tweet" @click="showNewTweetModal = true">推文</button>
      </div>
      <div v-if="$route.path.indexOf('admin') > 0" class="nav-item" @click="$router.push('/admin/main').catch(()=>{})"  :class="{ active: $route.path === '/admin/main' }">
        <div class="icon index"></div>
        推文清單
      </div>
      <div v-if="$route.path.indexOf('admin') > 0" class="nav-item" @click="$router.push('/admin/users').catch(()=>{})"  :class="{ active: $route.path === '/admin/users' }">
        <div class="icon user"></div>
        使用者列表
      </div>
    </div>

    <div class="logout-wrapper" @click="logout">
      <div class="icon logout"></div>
      登出
    </div>
    <ModalForNewTweet v-if="showNewTweetModal" name="ModalForNewTweet" @after-click-cross="showNewTweetModal = false" @postTweet="postTweet"></ModalForNewTweet>
  </div>
  
</template>

<script>

import { mapState } from 'vuex'
import TweetsAPI from '@/apis/tweets'
import chatAPI from '@/apis/chats'
import subscribeAPI from '@/apis/subscribes'
import { Toast } from '@/utils/helpers'
import ModalForNewTweet from '@/components/ModalForNewTweet.vue'
export default {
  name: 'Navbar',
  components: {
    ModalForNewTweet
  },
  data () {
    return {
      showNewTweetModal: false,
      countUnreadMessages: 0,
      countUnreadNoti: 0,
      latestNoti: {}
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  created () {
    this.fetchUnreadMessages()
    this.$bus.$on('updateUnreadMessages', () => {
      this.fetchUnreadMessages()
    })
    this.$socket.on('unread_msg', () => {
      this.fetchUnreadMessages()
    })
    this.$socket.emit('init notification', this.currentUser.id)

    this.$socket.on('get notification', () => {
      this.fetchUnreadMessages()
      this.$bus.$emit('updateNotifications')
    })
  },
  beforeDestroy () {
    this.$bus.$off('updateUnreadMessages')
  },
  methods: {
    logout () {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    },
    async postTweet (description) {
      try {
        if (!description) {
          Toast.fire({
            icon: 'error',
            title: '請輸入內容'
          })
          return
        }

        if (description.length > 140) {
          Toast.fire({
            icon: 'error',
            title: '推文字數需在140內'
          })
          return
        }

        const { data } = await TweetsAPI.postTweet({ description })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$socket.emit('tweet notification', {
          senderId: this.currentUser.id,
          titleData: `${this.currentUser.name} 有新的推文`,
          contentData: description,
          url: `/reply_list/${data.tweetId}`,
          type: 'tweet'
        })

        this.$bus.$emit('renewTweets')
        this.showNewTweetModal = false
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法推文，請稍候'
        })
      }
    },
    async fetchUnreadMessages () {
      try {
        Promise.all([chatAPI.getUnreadMessages(), subscribeAPI.getNotifications()])
          .then(([data, notiData]) => {
            this.countUnreadNoti = notiData.data ? notiData.data.filter(d => d.isRead === false).length : 0
            this.countUnreadMessages = data.data ? data.data.length : 0
            const scroll = this.$refs.boardWrapper
            if (scroll) {
              scroll.scrollTop = scroll.scrollHeight
              scroll.animate({scrollTop: scroll.scrollHeight})
            }
          })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得未讀訊息，請稍候'
        })
      }
    },
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
.nav {
  margin: 0px 40px 0 103px;
  padding-top: 4px;
  max-width: 235px;
  width: 100%;
  height: 100%;
  position: relative;
  .logo {
    height: 50px;
    width: 50px;
    cursor: pointer;
    .icon.logo {
      background-color: $orange;
      width: 100%;
      height: 100%;
      mask: url(../assets/icon_logo.svg) no-repeat center;
    }
  }
  .nav-item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 24px;
    width: 100%;
    .nav-item {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      height: 60px;
      font-size: 18px;
      font-weight: 700;
      cursor: pointer;
      transition: ease-in 0.2s;
      &:hover {
        color: $orange;
        .icon {
          background-color: $orange;
        }
        .icon.ms-noti {
          background-color: none;
        }
        .unread-messages-wrapper .unread-messages {
          background-color: $orange;
        }
      }
      .icon {
        background-color: #000000;
        width: 100%;
        height: 100%;
        max-height: 24px;
        max-width: 24px;
        margin-right: 20px;
      }
      .icon.index {
        mask: url(../assets/icon_index.svg) no-repeat center;
      }
      .icon.user {
        mask: url(../assets/icon_user.svg) no-repeat center;
      }
      .icon.cog {
        mask: url(../assets/icon_cog.svg) no-repeat center;
      }
      .icon.messenge {
        mask: url(../assets/icon_msg.svg) no-repeat center;
      }
      .icon.noti {
        mask: url(../assets/icon_noti.svg) no-repeat center;
      }
      .icon.msg-noti {
        background-color: #ffffff !important;
      }
      .btn-tweet {
        border: none;
        text-align: center;
        background: $orange;
        height: 45px;
        width: 100%;
        max-width: 210px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 700;
        color: #ffffff;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          box-shadow: 0 0 3px 1px $lightdark;
          background-color: $deeporange;
          color: #ffffff;
        }
        &:focus {
          outline: 0;
        }
      }
      .unread-noti {
        z-index: 999;
        position: absolute;
        font-size: 12px;
        top: 12px;
        left: 15px;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: $orange;
        color: #ffffff;
      }
      .unread-messages-wrapper {
        flex-grow: 1;
        .unread-messages {
          margin: auto;
          font-size: 16px;
          font-weight: 700;
          width: 24px;
          height: 24px;
          color: #ffffff;
          border-radius: 30px;
          background-color: #000000;
        }
      }
    }
    .nav-item.active {
        color: $orange;
        .icon {
          background-color: $orange;
        }
        .unread-messages {
          background-color: $orange;
        }
      }
  }
  .logout-wrapper {
    width: 100%;
    height: 60px;
    position: absolute;
    bottom: 0;
    text-align: left;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      color: $orange;
      .icon.logout {
        background-color: $orange;
      }
    }
    .icon.logout {
      mask: url(../assets/icon_logout.svg) no-repeat center;
      background-color: #000000;
      width: 100%;
      height: 100%;
      max-width: 24px;
      max-height: 24px;
      margin-right: 20px;
    }
  }
}
</style>
