
<template>
  <div class="follower-main">
    <div class="upper">
      <img class="arrow" @click="$router.go(-1)" src="@/asset/Vector@2x.png" alt="">
      <div class="title">
        <h3>{{ nowUser.name }}</h3>
        <span v-if="nowUser.tweets">{{ nowUser.tweets.length }} 推文</span>
      </div>
    </div>
    <div class="tab self" v-if="this.$route.path.indexOf('/self') > 0">
      <div class="item" :class="{ active: this.$route.path === '/user/self/follower' }" @click="$router.push('/user/self/follower')"> 
        <div class="text">追隨者</div>
      </div>
      
      <div class="item" :class="{ active: $route.path === '/user/self/following' }" @click="$router.push('/user/self/following')">
        <div class="text">正在跟隨</div>
      </div>
    </div>
    <div class="tab ohter" v-if="!(this.$route.path.indexOf('/self') > 0)">
      <div class="item" :class="{ active: this.$route.path.indexOf('follower') > 0 }" @click="$router.push(`/user/other/${nowUser.user.id}/follower`).catch(()=>{})"> 
        <div class="text">追隨者</div>
      </div>
      
      <div class="item" :class="{ active: this.$route.path.indexOf('following') > 0 }" @click="$router.push(`/user/other/${nowUser.user.id}/following`).catch(()=>{})">
        <div class="text">正在跟隨</div>
      </div>
    </div>
    <div class="followListContent">
      <div>
        <div v-for="follower in followers" :key="follower.id" class="singleContent">
          <img  v-if="follower" :src="follower.avatar" alt="" @click="$router.push(`/user/other/${nowUser.user.id}`).catch(()=>{})">
          <div class="text">
            <h5 v-if="follower" class="title" @click="$router.push(`/user/other/${nowUser.user.id}`).catch(()=>{})">{{follower.name}}</h5>
            <h5  v-if="follower" class="account" @click="$router.push(`/user/other/${nowUser.user.id}`).catch(()=>{})">{{follower.account}}</h5>
            <p  v-if="follower" class="content">{{follower.introduction}}</p>
          </div>
          <button 
            v-if="follower"
            v-show="follower.isFollowed && follower.id !== currentUser.id"
            class="btn-follow unfollow" @click="deleteFollowing(follower.id)">
            正在跟隨
          </button>
          <button
            v-if="follower"
            v-show="!follower.isFollowed && follower.id !== currentUser.id"
            class="btn-follow"
            @click="addFollowing(follower.id)">
            跟隨
          </button>
        </div>
      </div>

    </div>  




  </div>
</template>

<script>
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
import followshipsAPI from '@/apis/followships'
export default {
  data () {
    return {
      followers: []
    }
  },
  props: {
    initialFollowers: {
      type: Array
    },
    nowUser: {
      type: Object
    }
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated'])
  },
  watch: {
    initialFollowers: function () {
      this.followers = this.initialFollowers
    },
    nowUser: function () {
      
    },
    deep: true
  },
  created () {
    this.followers = this.initialFollowers
  },
  methods: {
    async addFollowing (userId) {
      try {
        const { data } = await followshipsAPI.addFollowing({ userId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$bus.$emit('followAction', { type: 'follow', userId: userId})
        this.followers.forEach(follower => {
          if (follower.id === userId) {
            follower.isFollowed = true
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
        this.followers.forEach(follower => {
          if (follower.id === userId) {
            follower.isFollowed = false
          }
        })
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
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
  .follower-main {
    border-left: 1px solid $divider;
    width: 600px;
    display: flex;
    flex-direction: column;
    .upper {
      display: flex;
      flex-direction: row;
      .arrow {
        cursor: pointer;
        width: 17px;
        height: 14px;
        margin: 20px 43px 0 20px;
      }
      .title {
        h3 {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 900;
          font-size: 19px;
          line-height: 28px;
          margin-bottom: 0;
        }
        span {
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: 500;
          font-size: 13px;
          line-height: 19px;
        }
      }
    }
    .tab {
      border-bottom: 1px solid $divider;
      height: 54px;
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      .item {
        width: 100%;
        max-width: 130px;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: ease-in 0.2s;
        &:hover {
          backdrop-filter: brightness(.95);
        }
        .text {
          z-index: -1;
          font-weight: bold;
          font-size: 15px;
          line-height: 22px;
          color: $bitdark;
        }
      }
      .item.active {
        border-bottom: 2px solid $orange;
        .text {
          color: $orange;
        }
      }
    }
    .followListContent {
      height: 104px;
      width: 600px;
      .singleContent {
        height: 104px;
        width: 100%;
        display: flex;
        flex-direction: row;
        position: relative;
        // outline: blue solid;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin: 13px 10px 41px 15px;
          object-fit: cover;
        }
        .text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 10px 0 10px 0;
          .title {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: bold;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          .account {
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 15px;
            text-align: start;
            cursor: pointer;
            color: $bitdark;
            &:hover {
              text-decoration: underline;
            }
          }
          .content {
            width: 510px;
            height: 44px;
            font-family: Noto Sans TC;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            text-align: start;
            margin: 0 15px 0 0;
          }
          
        }
        .btn-follow {
          cursor: pointer;
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
          &:focus {
            outline: none;
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
  }

  
</style>