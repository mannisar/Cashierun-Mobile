import axios from 'axios'

export const login = (data) => {
  return {
    type: 'LOGIN',
    payload: axios({
      method: 'POST',
      url: 'http://54.159.148.159/account/login',
      data: data
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}
