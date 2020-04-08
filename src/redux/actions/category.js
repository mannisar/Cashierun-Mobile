// import { REACT_APP_API_URL } from 'react-native-dotenv'
import axios from 'axios'

export const createCategory = (data) => {
  return {
    type: 'CREATE_CATEGORY',
    payload: axios({
      method: 'POST',
      url: 'http://54.159.148.159/category',
      data: data
    })
  }
}

export const readCategory = () => {
  return {
    type: 'READ_CATEGORY',
    payload: axios({
      method: 'GET',
      url: 'http://54.159.148.159/category'
    })
  }
}

export const updateCategory = (id, data) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: axios({
      method: 'PATCH',
      url: `http://54.159.148.159/category/${id}`,
      data: data
    })
  }
}

export const deleteCategory = (id) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: axios({
      method: 'DELETE',
      url: `http://54.159.148.159/category/${id}`
    })
  }
}

export const searchCategory = (data) => {
  return {
    type: 'SEARCH_CATEGORY',
    payload: axios({
      method: 'GET',
      url: `http://54.159.148.159/category/${data}`
    })
  }
}
