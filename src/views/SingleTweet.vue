<template>
  <div class="page-container">
    <Navbar />
    <SingleContent />
    <RecommendUsers />
  </div>
</template>

<script>
  import Navbar from './../components/Navbar'
  import SingleContent from './../components/SingleContent'
  import RecommendUsers from './../components/RecommendUsers'
  export default {
  components: {
    Navbar,
    SingleContent,
    RecommendUsers
  }
}
  
</script>

<style lang="scss">
  .page-container {
    display: flex;
    flex-direction: row;
  } 
</style>