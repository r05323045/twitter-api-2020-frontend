<template>
  <div class="noti">
    <div class="header">
      通知
    </div>
    <div v-if="notifications.length > 0">
      <div @click="$router.push(notification.url).catch(()=>{})" class="list-item" v-for="notification in notifications" :key="notification.id">
        <div class="avatar" :style="{ background: `url(${notification.avatar}) no-repeat center/cover` }" @click.stop="$router.push(`/user/other/${notification.senderId}`).catch(()=>{})"></div>
        <div class="top-wrapper">
          <div class="info">
            <div class="title">{{ notification.titleData }}</div>
            <div class="time">&bull; {{ notification.createdAt | fromNow }}</div>
          </div>
          <div v-if="notification.contentData" class="content">{{ notification.contentData }}</div>
        </div>
      </div>
    </div>
    <div class="nothing-here" v-if="notifications.length === 0">
       <div>你沒有任何通知</div>
    </div>
  </div>
</template>

<script>
import subscribeAPI from '@/apis/subscribes'
import { Toast } from '@/utils/helpers'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      notifications: []
    }
  },
  created () {
    this.fetchNotifications()
    this.$bus.$on('updateNotifications', () => {
      this.fetchNotifications()
    })
  },  
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  methods: {
    async fetchNotifications () {
      const loader = this.$loading.show({
        isFullPage: true,
        opacity: 1
      }, { default: this.$createElement('MyLoading') })
      try {
        const { data } = await subscribeAPI.getNotifications()
        console.log(data)
        this.notifications = data
        this.notifications .sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
        })
        loader.hide()
      } catch (error) {
        loader.hide()
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '目前無法取得通知，請稍候'
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
$divider: #E6ECF0;
$bitdark: #657786;
.noti {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  border: 1px solid $divider;
  max-width: 600px;
  padding: 0;
  .header {
    border-bottom: 1px solid $divider;
    height: 55px;
    padding: 15px 0 15px 15px;
    line-height: 26px;
    font-size: 18px;
    font-weight: 700;
    text-align: left;
  }
  .list-item {
    padding: 10px 0 10px 0;
    border-bottom: 1px solid $divider;
    display: flex;
    flex-direction: row;
    position: relative;
    cursor: pointer;
    transition: ease-in 0.2s;
    &:hover {
      backdrop-filter: brightness(.95);
    }
    .avatar {
      height: 50px;
      min-width: 50px;
      border-radius: 100px;
      margin: 3px 0 0 15px;
      background: $bitdark;
      cursor: pointer;
      &:hover {
        filter: brightness(.9);
      }
    }
    .top-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      .info {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 22px;
        line-height: 22px;
        .title {
          font-weight: 700;
          margin-right: 5px;
          cursor: pointer;
        }
        .time {
          font-weight: 500;
          font-size: 15px;
          line-height: 22px;
          color: #657786;
          text-align: start;
        }
      }
      .content {
        margin-top: 5px;
        width: 100%;
        max-width: 510px;
        overflow: hidden;
        font-size: 15px;
        color: $bitdark;
        font-weight: 500;
        line-height: 22px;
        text-align: left;
      }
    }
  }
  .nothing-here {
    height: 100%;
    width: 100%;
    font-size: 22px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>