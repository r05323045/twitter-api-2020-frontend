import { apiHelper } from './../utils/helpers'

export default {
  signIn ({ account, password }) {
    return apiHelper.post('api/signin', {
      account,
      password
    })
  }
}
