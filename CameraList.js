
import React   from 'react'
import {
  StyleSheet,
  View,
  Text }       from 'react-native'

export default class DroneList extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Cameras go here...</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  }
})
