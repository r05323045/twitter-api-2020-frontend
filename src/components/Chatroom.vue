<template>
  <div class="chat-room">
    <div class="chat-users">
      <div class="title">
        訊息
        <div class="icon messege"></div>
      </div>
      <div class="list-group">
        <div  v-show="!(!more && idx > 4)" v-for="(user, idx) in topUsers" @click="controlActive(idx, user)" :key="user.id" class="list-group-item">
          <div v-show="messengeActive[idx]" class="active-bar"></div>
          <div class="avatar" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})" :style="{ background: `url(${user.avatar}) no-repeat center/cover` }"></div>
          <div class="messenge-time">{{ user.createdAt | fromNow }}</div>
          <div class="info-wrapper">
            <div class="info">
              <div class="name" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{ user.name }}</div>
              <div class="account" @click="$router.push(`/user/other/${user.id}`).catch(()=>{})">{{ user.account }}</div>
            </div>
            <div class="messenge-text">{{ user.introduction }}</div>
          </div>  
        </div>
      </div>
      <div></div>
    </div>
    <MessengeBoard :userChatTo="userChatTo"></MessengeBoard>
  </div>
</template>

<script>
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import MessengeBoard from '@/components/MessengeBoard.vue' 
export default {
  components: {
    MessengeBoard
  },
  data () {
    return {
      topUsers: [],
      more: false,
      messengeActive: [],
      userChatTo: {}
    }
  },
  created () {
    this.fetchTopUsers()
    this.messengeActive = new Array(this.topUsers.length).fill(false)
    this.messengeActive[0] = true
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    controlActive (index, user) {
      this.messengeActive = new Array(this.topUsers.length).fill(false)
      this.messengeActive[index] = true
      this.userChatTo = user
    },
    async fetchTopUsers () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await usersAPI.getTopUsers()
        this.topUsers = data.users.map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          account: user.account,
          followerCount: user.FollowerCount,
          introduction: user.introduction,
          createdAt: user.createdAt,
          isFollowed: user.isFollowed
        })).filter(user => user.id !== this.currentUser.id)
        this.userChatTo = this.topUsers[0]
        loader.hide()
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法為你推薦追蹤，請稍候'
        })
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
        padding: 10px 15px 0 15px;
        background: none;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
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
        .messenge-time {
          position: absolute;
          top: 10px;
          right: 15px;
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          color: $bitdark;
        }
        .info-wrapper{
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          .info {
            display: flex;
            flex-direction: row;
            .name {
              text-align: left;
              margin: 0 5px 3px 0;
              font-size: 15px;
              line-height: 15px;
              font-weight: 700;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
            .account {
              text-align: left;
              font-size: 15px;
              line-height: 15px;
              font-weight: 700;
              color: $bitdark;
              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
          .messenge-text {
            text-align: left;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
          }
        }
      }
    }
  }
}
</style>
