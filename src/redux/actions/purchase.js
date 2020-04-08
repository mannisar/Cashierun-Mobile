// import { REACT_APP_API_URL } from 'react-native-dotenv'
import axios from 'axios'

export const purchase = (data) => {
  return {
    type: 'PURCHASE',
    payload: axios({
      method: 'POST',
      url: 'http://54.159.148.159/purchase',
      data: data
    })
  }
}
