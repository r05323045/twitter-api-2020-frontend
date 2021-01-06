<template>
  <div class="noti">
    <div class="header">
      通知
    </div>
  </div>
</template>

<script>

export default {}

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