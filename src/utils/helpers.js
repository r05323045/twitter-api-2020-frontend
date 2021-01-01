import axios from 'axios'
import Swal from 'sweetalert2'

// const proxyURL = 'https://cors-anywhere.herokuapp.com/'
const baseURL = 'http://simple-twitter-demo-ac.herokuapp.com/api'

export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
