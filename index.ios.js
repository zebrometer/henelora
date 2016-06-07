
import React from 'react'

import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  Text,
  View } from 'react-native'

import Button       from 'react-native-button'
import SettingsList from 'react-native-settings-list'

import ConfigScreen from './ConfigScreen'


class Henelora extends React.Component {
  render() {
    return (
      <NavigatorIOS
        ref={this.configureRoutes}
        style={styles.container}
        initialRoute={{
          title     : '',
          component :  ConfigScreen,
          passProps : {}
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 35,
  }
})

AppRegistry.registerComponent('henelora', () => Henelora)
