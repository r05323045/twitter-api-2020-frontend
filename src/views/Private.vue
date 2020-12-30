<template>
  <div class="private-main">
    <Navbar></Navbar>
    <div class="private-container">
      <PrivateChatroom></PrivateChatroom>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import { mapState } from 'vuex'
import PrivateChatroom from '@/components/PrivateChatroom.vue'
export default {
  components: {
    Navbar,
    PrivateChatroom,
  },
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  }
}
</script>

<style lang="scss">
$orange: #FF6600;
$deeporange: #F34A16;
$lightdark: #9197A3;
$divider: #E6ECF0;
.private-main {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  .private-container {
    width: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    border-left: 1px solid $divider;
    padding: 0;
  }
}
</style>
