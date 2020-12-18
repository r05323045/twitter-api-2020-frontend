<template>
  <div class="user-profile">
    <Navbar></Navbar>
    <Profile></Profile>
    <RecommendUsers></RecommendUsers>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import RecommendUsers from '@/components/RecommendUsers.vue'
import Profile from '@/components/Profile.vue'
export default {
  name: 'UserProfile',
  components: {
    Navbar,
    RecommendUsers,
    Profile
  }
}

</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$divider: #E6ECF0;
.user-profile {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
}
</style>
