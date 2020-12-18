<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <img src="./../asset/exit.png" alt="">
      </div>
      <hr>
      <div class="modal-body">
        
          <img class="photo" src="" alt="">
          <textarea class="tweet-content" type="textarea" placeholder="有什麼新鮮事嗎?" name="" id=""></textarea>
          <button>推文</button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style lang='scss'>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    
    
    .modal-content {
      position: absolute;
      right: 420px;
      left: 420px;
      top: 54px;
      width: 600px;
      height: 300px;
      border-radius: 14px;
      border: 1px solid #C4C4C4;
      // outline: blue solid;
      hr {
        height: 1px;
        margin: 0;
      }
      .modal-header {
        height: 54px;
        // outline: red solid;
        img {
          height: 15px;
          width: 15px;
          padding: 19.5px auto 19.5px 19.5px;
        }
      }
      .modal-body {
        position: relative;
        // outline: black solid ;
        height: 245px;
        img {
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