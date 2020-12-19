<template>
  <div class="modal">
    <div class="modal-content">

      <div class="modal-header">
        <img class='cross'  @click.stop.prevent="cancelModalClick()" src="./../asset/exit.png" alt="">
      </div>
      
      <hr>
      <div class="modal-body">
        <!-- <hr class="line"> -->
        <img class="photo" src="./../asset/elephant.png" alt="">
        <textarea class="tweet-content" type="textarea" placeholder="有什麼新鮮事嗎?" name="" id=""></textarea>
        <button>推文</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalForNewTweet',
  methods: {
    cancelModalClick() {
      this.$emit('after-click-cross')
    }
  }
}
</script>

<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    // z-index: 100;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
        
    .modal-content {
      position: absolute;
      left: 50%;
      top: 54px;
      width: 600px;
      height: 300px;
      border-radius: 14px;
      // border: 1px solid #C4C4C4;
      transform: translate(-50%, 0);
      // outline: blue solid;
      
      .modal-header {
        height: 54px;
        width: 600px;
        
        margin: 0;
        padding: 19.5px auto 19.5px 19.5px;
        // outline: red solid 100px;
        .cross {
          line-height: 54px;
          height: 15px;
          width: 15px;
          
          // outline: solid red;

        }
      }

      hr {
        width: 1px;
        color: #C4C4C4;
        margin: 0;

      }

      .modal-body {
        position: relative;
        // outline: black solid ;
        height: 245px;
        .photo {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #C4C4C4;
          position: absolute;
          left: 15px;
          
        }
        .tweet-content {
          height: 100%;
          width: 510px;
          margin-left: 75px - 16px;
          margin-right: 15px;
          border: none;
          resize: none;
          outline: none;
          ::placeholder {
            font-size: 16px;
            font-weight: 500;
            color: #919191;
          }
        }
        button {
          position: absolute;
          right: 15px;
          bottom: 15px;
          background: #FF6600;
          border-radius: 100px;
          color: #ffffff;
          width: 64px;
          height: 40px;
          outline: none;
          border: none;
        }
      }
    }
  }
</style>