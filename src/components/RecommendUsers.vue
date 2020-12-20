<template>
  <div class="recommend-users" :style="[more ? { height: `${topUsers.length * 71 + 92}px` } : { height:  `${5 * 71 + 92}px`}]">
    <div class="title">跟隨誰</div>
    <div class="list-group">
      <div v-show="!(!more && idx > 4)" v-for="(user, idx) in topUsers" :key="user.id" class="list-group-item">
        <div class="avatar" :style="{ background: `url(${user.avatar}) no-repeat center/cover` }"></div>
        <div class="info">
          <div class="name" @click="$router.push(`/user/other/${user.id}`)">{{ user.name }}</div>
          <div class="account" @click="$router.push(`/user/other/${user.id}`)">{{ user.account }}</div>
        </div>
        <button v-show="user.isFollowed" class="btn btn-follow unfollow" @click="deleteFollowing(user.id)">正在跟隨</button>
        <button v-show="!user.isFollowed" class="btn btn-follow" @click="addFollowing(user.id)">跟隨</button>
      </div>
    </div>
    <div v-show="!more" class="footer" @click="more = !more">顯示更多</div>
    <div v-show="more" class="footer" @click="more = !more">顯示更少</div>
  </div>
</template>

<script>

import followshipsAPI from '@/apis/followships'
import usersAPI from '@/apis/users'
import { Toast } from '@/utils/helpers'

export default {
  name: 'RecommendUsers',
  data () {
    return {
      topUsers: [],
      more: false
    }
  },
  created () {
    this.fetchTopUsers()
    this.$bus.$on('followAction', action => {
      this.followAction(action)
    })
  },
  methods: {
    async fetchTopUsers () {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.topUsers = data.users.map(user => ({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          account: user.account,
          followerCount: user.FollowerCount,
          isFollowed: user.isFollowed
        }))
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法為你推薦追蹤，請稍候'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await followshipsAPI.addFollowing({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('followAction', { type: 'follow', userId: userId})
        this.topUsers = this.topUsers.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true
            }
          }
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollowing (userId) {
      try {
        const { data } = await followshipsAPI.deleteFollowing({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('followAction', { type: 'unfollow', userId: userId})
        this.topUsers = this.topUsers.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false
            }
          }
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    },
    followAction (action) {
      this.topUsers = this.topUsers.map(user => {
        if (user.id !== action.userId) {
          return user
        } else {
          return {
            ...user,
            isFollowed: action.type === 'follow' ? true : false 
          }
        }
      })
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
.recommend-users {
  width: 100%;
  max-width: 350px;
  height: 517px;
  margin: 15px 82px 0 30px;
  border-radius: 14px;
  background: $lightgray;
  .title {
    margin-top: 10px;
    text-align: left;
    padding: 0px 0 0 15px; 
    font-size: 18px;
    line-height: 26px;
    height: 36px;
    font-weight: 700;
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
        margin-top: 8px;
        display: flex;
        flex-direction: column;
        .name {
          margin-bottom: 3px;
          font-size: 15px;
          line-height: 15px;
          font-weight: 700;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .account {
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
      .btn-follow {
        width: 100%;
        max-width: 62px;
        position: absolute;
        top: 20px;
        right: 15px;
        height: 30px;
        line-height: 15px;
        margin-left: auto;
        border: 1px solid $orange ;
        background: none;
        font-size: 15px;
        font-weight: 700;
        color: $orange;
        border-radius: 100px;
        transition: ease-in 0.2s;
        &:hover {
          box-shadow: 0 0 3px 1px $bitdark;
          background-color: $orange;
          color: #ffffff;
        }
      }
      .btn-follow.unfollow {
        max-width: 92px;
        background: $orange;
        color: #ffffff;
        &:hover {
          background-color: $deeporange;
        }
      }
    }
  }
  .footer {
    margin-bottom: auto;
    height: 22px;
    line-height: 22px;
    max-width: 60px;
    margin: 12px 0 12px 15px;
    text-align: left;
    font-weight: normal;
    font-size: 15px;
    color: $orange;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      text-decoration: underline;
      color: $deeporange;
      font-weight: bold;
    }
  }
}
</style>
