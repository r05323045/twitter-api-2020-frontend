<template>
  <div class="noti">
    <div class="header">
      通知
    </div>
    <div v-for="notification in notifications" :key="notification.id">
      <div class="title">{{ notification.titleData }}</div>
      <div v-if="notification.contentData" class="content">{{ notification.contentData }}</div>
      <div class="time">{{ notification.createdAt | fromNow }}</div>
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
        this.notifications = data
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
}
</style>