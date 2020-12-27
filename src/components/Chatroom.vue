<template>
  <div class="chat-room">
    <div class="chat-users">
      <div class="title">
        上線使用者 ({{ onlineUsers ? onlineUsers.length : 0 }})
        <div v-show="$route.path !== '/chat'" class="icon messege"></div>
      </div>
      <div class="list-group" v-if="onlineUsers.length > 0">
        <div v-for="(user, idx) in onlineUsers" :key="`${user.id + Math.random()}`" class="list-group-item">
          <div v-show="messengeActive[idx]" class="active-bar"></div>
          <div class="avatar" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})" :style="{ background: `url(${user.User ? user.User.avatar : ''}) no-repeat center/cover` }"></div>
          <div class="info">  
            <div class="name" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{user.User ? user.User.name : ''}}</div>
            <div class="account" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{user.User ? user.User.account : '' }}</div>
          </div>
        </div>
      </div>
    </div>
    <MessengeBoard :userChatTo="userChatTo" @someoneComein="updateOnelineUsers" ></MessengeBoard>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessengeBoard from '@/components/MessengeBoard.vue' 
export default {
  components: {
    MessengeBoard
  },
  data () {
    return {
      onlineNumber: 0,
      onlineUsers: [],
      more: false,
      messengeActive: [],
      userChatTo: {}
    }
  },
  mounted () {
    this.onlineUsers = [ this.currentUser ]
    //this.messengeActive = new Array(this.onlineUsers.length).fill(false)
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  watch: {
    onlineUsers: function () {
      return this.onlineUsers
    }
  },
  methods: {
    /*
    controlActive (index, user) {
      this.messengeActive = new Array(this.topUsers.length).fill(false)
      this.messengeActive[index] = true
      this.userChatTo = user
    },
    */
    updateOnelineUsers (data) {
      this.onlineUsers = data
      if (!this.onlineUsers.map(d => d.User.id).includes(this.currentUser.id)) {
        const onlineFormat = { ...this.currentUser, User: {name: this.currentUser.name, account: this.currentUser.account, avatar: this.currentUser.avatar}}
        this.onlineUsers = [...this.onlineUsers, onlineFormat]
      }
    },
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
      }
    }
  }
}
</style>
