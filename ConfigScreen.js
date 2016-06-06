
import { StyleSheet, View, AlertIOS } from 'react-native'
import React                   from 'react'
import SettingsList            from 'react-native-settings-list'
import DroneList               from './DroneList'
import CameraList              from './CameraList'

export default class ConfigScreen extends React.Component {
  constructor(props) {
    super(props)

    this.onDroneConfig     = this.onDroneConfig.bind(this)
    this.onCameraConfig    = this.onCameraConfig.bind(this)
    this.onFrequencyConfig = this.onFrequencyConfig.bind(this)
  }

  onDroneConfig() {
    this.props.navigator.push({
      title: 'Drones',
      component: DroneList,
      passProps: {}
    })
  }

  onCameraConfig() {
    this.props.navigator.push({
      title: 'Cameras',
      component: CameraList,
      passProps: {}
    })
  }

  onFrequencyConfig() {
    AlertIOS.alert(
      'Frequency Configuration Action',
      'TODO'
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsList>
          <SettingsList.Item
              hasNavArrow={true}
              switchState={false}
              hasSwitch={false}
              titleInfo={'Alpha-03'}
              switchOnValueChange={() => {}}
              title='Drone'
              onPress={this.onDroneConfig} />

          <SettingsList.Item
              hasNavArrow={true}
              switchState={false}
              hasSwitch={false}
              titleInfo={'CamCoderX'}
              switchOnValueChange={() => {}}
              title='Camera'
              onPress={this.onCameraConfig} />

          <SettingsList.Item
              hasNavArrow={true}
              switchState={false}
              hasSwitch={false}
              titleInfo={'136 MHz'}
              switchOnValueChange={() => {}}
              title='Frequency'
              onPress={this.onFrequencyConfig} />

        </SettingsList>
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
