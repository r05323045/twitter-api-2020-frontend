<template>
  <div class="container">
    <div class="header">
      <h3>帳戶設定</h3>
    </div>

    <div class="content">
      <form>
        <div class="form-label-group mb-2">
          <!-- <label for="account">帳號</label> -->
          <input
            id="account"
            name="account"
            type="text"
            class="form-control"
            placeholder="account"
            autocomplete="accountname"
            required
            autofocus
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="name">名稱</label> -->
          <input
            id="name"
            name="name"
            type="text"
            class="form-control"
            placeholder="name"
            autocomplete="username"
            required
            
          >
        </div>

        <div class="form-label-group mb-2">
          <!-- <label for="email">Email</label> -->
          <input
            id="email"
            name="email"
            type="email"
            class="form-control"
            placeholder="email"
            autocomplete="email"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password">密碼</label> -->
          <input
            id="password"
            name="password"
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="new-password"
            required
          >
        </div>

        <div class="form-label-group mb-3">
          <!-- <label for="password-check">密碼確認</label> -->
          <input
            id="password-check"
            name="passwordCheck"
            type="password"
            class="form-control"
            placeholder="Password"
            autocomplete="new-password"
            required
          >
        </div>
      
        <div  class="link">
          <span class="save-button">儲存</span> 
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
 
  .header {
    width: auto;
    font-family: Noto Sans TC;
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 28px;
    height: 55px;
    border-bottom: 1px solid #E6ECF0;
    margin-bottom: 2px;
    h3 {
      margin-left: 23.69px;
      line-height: 55px;
      text-align: start;
    }
  }

  .content {
    margin-left: 16px;
    form {
      // outline: red solid;
      width: auto;
      height: auto;
      .form-label-group {
        width: 642px;
        height: 50px;
        margin: 0px;
        padding: 0;
        input {

          border-radius: 0;
          border: none;
          border-bottom: 2px solid #919191;
          background: #F5F8FA;
          margin-top: 30px;
          width: 642px;
          height: 50px;
        }
      }

      .link {
        width: 122px;
        height: 50px;
        background: #FF6600;
        border-radius: 50px;
        padding: 0;
        margin-left: 536px - 16px;
        
        .save-button {
          line-height: 50px;
          font-family: Noto Sans TC;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          color: #ffffff;
          
        }
      }
    }
  }    
}
</style>