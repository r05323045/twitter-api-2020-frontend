<template>
  <div class="row page-container">
    <Navbar class="col-3" />
    <SelfUserFollowers />
    <RecommendUsers class="col-4" />
  </div>
     
</template>

<script>
import SelfUserFollowers from "./../components/SelfUserFollowers" 
import Navbar from "./../components/Navbar"
import RecommendUsers from "./../components/RecommendUsers"
export default {
  components: {
    Navbar,
    SelfUserFollowers,
    RecommendUsers
  }
}
</script>

<style>
  .page-container {
    /* outline: red solid;   */
    min-width: 1440px;
    margin-top: 15px;
  }
  /* .content {
    flex: 1;
  } */
</style>