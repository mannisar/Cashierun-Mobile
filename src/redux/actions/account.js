// import { REACT_APP_API_URL } from 'react-native-dotenv'
import axios from 'axios'

export const createAccount = (data) => {
  return {
    type: 'CREATE_ACCOUNT',
    payload: axios({
      method: 'POST',
      url: 'http://54.159.148.159/account',
      data: data
    })
  }
}

export const readAccount = () => {
  return {
    type: 'READ_ACCOUNT',
    payload: axios({
      method: 'GET',
      url: 'http://54.159.148.159/account'
    })
  }
}

export const updateAccount = (id, data) => {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: axios({
      method: 'PATCH',
      url: `http://54.159.148.159/account/${id}`,
      data: data
    })
  }
}

export const deleteAccount = (id) => {
  return {
    type: 'DELETE_ACCOUNT',
    payload: axios({
      method: 'DELETE',
      url: `http://54.159.148.159/account/${id}`
    })
  }
}
