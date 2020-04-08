import axios from 'axios'

export const readRole = () => {
  return {
    type: 'READ_ROLE',
    payload: axios({
      method: 'GET',
      url: 'http://54.159.148.159/role'
    })
  }
}
