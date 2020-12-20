<template>
  <div class="main-setting"> 
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
    width: 100%;
    height: 100%;
    display:flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }
</style>