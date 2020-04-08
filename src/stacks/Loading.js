import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

class Loading extends Component {
  componentDidMount () {
    const { isAuthenticated } = this.props.auth
    if (isAuthenticated) {
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  }

  render () {
    console.disableYellowBox = true
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
        <ActivityIndicator size='large' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Loading)
