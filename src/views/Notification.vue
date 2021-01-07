<template>
  <div class="notification">
    <Navbar></Navbar>
    <Noti></Noti>
    <RecommendUsers></RecommendUsers>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RecommendUsers from '@/components/RecommendUsers.vue'
import Noti from '@/components/Noti.vue'

export default {
  components: {
    Navbar,
    RecommendUsers,
    Noti
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$divider: #E6ECF0;
.notification {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
