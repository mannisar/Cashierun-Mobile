import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/actions/auth'
import { ToastAndroid } from 'react-native'

class Logout extends Component {
  componentDidMount () {
    this.props.dispatch(logout())
    this.props.navigation.navigate('Login')
    ToastAndroid.show(
      'Anda Telah Keluar!',
      ToastAndroid.SHORT
    )
  }

  render () {
    console.disableYellowBox = true
    return (
      <></>
    )
  }
}

export default connect()(Logout)
