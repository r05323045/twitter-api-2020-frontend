<template>
  <div class="admin-main">
    <Navbar></Navbar>
    <div class="container">
      <div class="title">使用者列表</div>
      <div class="user-card-deck">
        <div v-for="rowNum in Math.ceil(users.length/4)" :key="`row-${rowNum}`" class="user-card-row">
          <div v-for="user in users.slice((rowNum - 1) * 4, rowNum * 4)" :key="user.id" class="user-card">
            <div class="cover-photo" :style="{ background: `url(${user.cover}) no-repeat center/cover` }"></div>
            <div class="avatar" :style="{ background: `url(${user.avatar}) no-repeat center/cover` }"></div>
            <div class="name">{{ user.name }}</div>
            <div class="account">{{ user.account }}</div>
            <div class="action">
              <div class="reply-wrapper">
                <div class="icon reply"></div>
                <span class="number">{{ user.TweetCount }}</span>
              </div>
              <div class="like-wrapper">
                <div class="icon like"></div>
                <span class="number">{{ user.LikeCount }}</span>
              </div>
            </div>
            <div class="number-followers">
              <div>
                <span>{{ user.FollowingCount }} 個</span><span class="following">跟隨中</span>
                <span>{{ user.FollowerCount }} 位</span><span class="follower">跟隨者</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminAPI from '@/apis/admin'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'AdminMain',
  components: {
    Navbar
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.fetchUsers()
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  methods: {
    async fetchUsers () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await AdminAPI.getUsers()
        this.users = data
        this.users.sort((a, b) => {
          return a.TweetCount < b.TweetCount ? 1 : -1;
        })
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得使用者清單，請稍候'
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
$bitdark: #657786;
$divider: #E6ECF0;
.admin-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .container {
    border-left: 1px solid $divider;
    width: 100%;
    padding: 0;
    overflow-y: scroll;
    .title {
      width: 100%;
      border-bottom: 1px solid $divider;
      height: 55px;
      padding: 15px 0 0 26.55px;
      font-size: 18px;
      font-weight: 700;
      text-align: left;
    }
    .user-card-deck {
      padding: 15px 0 0 18px;
      max-height: calc(100vh - 55px);
      .user-card-row {
        display: flex;
        flex-direction: row;
        margin-bottom: 15px;
        .user-card {
          margin: 0px 15px 0px 0;
          width: 245px;
          height: 314px;
          position: relative;
          background: #F6F7F8;
          border-radius: 10px;
          transition: ease-in 0.2s;
          &:hover {
            box-shadow: 0 0 3px 2px $lightdark;
          }
          .cover-photo {
            width: 100%;
            max-width: 245px;
            height: 140px;
            background: url(https://images.unsplash.com/photo-1587502537147-2ba64a62e3d3?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2017&q=80) no-repeat center;
            background-size: cover;
            border-radius: 10px 10px 0px 0px;
          }
          .avatar {
            width: 100%;
            max-width: 100px;
            height: 100px;
            border: 4px solid none;
            background: url(https://source.unsplash.com/collection/4389261/100x100) #c4c4c4;
            border-radius: 100px;
            position: absolute;
            top: 68px;
            position: absolute;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            border: 4px solid #FFFFFF;
          }
          .name {
            margin-top: 33px;
            font-weight: 900;
            font-size: 15px;
            line-height: 22px;
          }
          .account {
            margin-top: 2px;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            color: $bitdark;
          }
          .action {
            margin-top: 15px;
            max-width: 130px;
            margin: 15px auto;
            height: 24px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            .reply-wrapper {
              margin-right: 15px;
              display: flex;
              flex-direction: row;
              align-items: center;
              .icon.reply {
                min-width: 19.75px;
                min-height: 19.75px;
                mask: url(../../assets/icon_reply.svg) no-repeat center;
                mask-size: contain;
                background-color: $bitdark;
              }
              .number {
                margin-left: 7.15px;
                font-weight: 500;
                font-size: 15px;
                line-height: 15px;
              }
            }
            .like-wrapper {
              display: flex;
              flex-direction: row;
              align-items: center;
              .icon.like {
                min-width: 19.75px;
                min-height: 19.75px;
                mask: url(../../assets/icon_like.svg) no-repeat center;
                mask-size: contain;
                background-color: $bitdark;
              }
              .number {
                margin-left: 6.95px;
                font-weight: 500;
                font-size: 15px;
                line-height: 15px;
              }
            }
          }
          .number-followers {
            display: flex;
            justify-content: center;
            text-align: left;
            height: 20px;
            line-height: 20px;
            font-weight: 500;
            font-size: 14px;
            .following {
              color: $bitdark;
              margin-right: 20px;
            }
            .follower {
              color: $bitdark;
            }
          }
        }
      }
    }
  }
}
</style>
