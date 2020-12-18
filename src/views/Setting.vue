<template>
  <div class="main-setting row"> 
    <Navbar />
    <SubSetting class="main"/>
  </div>
  
</template>

<script>
import Navbar from "./../components/Navbar"
import SubSetting from './../components/SubSetting'

export default {
  name: 'Setting',
  components: {
    Navbar,
    SubSetting
  }
}
</script>

<style lang="scss">
  .main-setting {
    display:flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
  }
</style>