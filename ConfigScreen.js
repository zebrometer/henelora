
import { StyleSheet, View, AlertIOS } from 'react-native'
import React                          from 'react'

import SettingsList            from 'react-native-settings-list'
import InventoryList           from './InventoryList'

export default class ConfigScreen extends React.Component {
  constructor(props) {
    super(props)

    this.onDroneConfig     = this.onDroneConfig.bind(this)
    this.onCameraConfig    = this.onCameraConfig.bind(this)
    this.onFrequencyConfig = this.onFrequencyConfig.bind(this)
  }

  loadInventory() {
    return new Promise((resolve, reject) => {
      const inventory = {
        drones: [
          { name: 'Drone 1', uuid: this.guid() },
          { name: 'Drone 2', uuid: this.guid() },
          { name: 'Drone 3', uuid: this.guid() },
          { name: 'Drone 4', uuid: this.guid() },
          { name: 'Drone 5', uuid: this.guid() },
          { name: 'Drone 6', uuid: this.guid() },
          { name: 'Drone 7', uuid: this.guid() }
        ],
        cameras: [
          { name: 'Camera 1', uuid: this.guid() },
          { name: 'Camera 2', uuid: this.guid() },
          { name: 'Camera 3', uuid: this.guid() },
          { name: 'Camera 4', uuid: this.guid() },
        ]
      }
      setTimeout(()=> {
        resolve(inventory)
      }, 200)
    })
  }

  loadPropData(propName) {
    return () => {
      return new Promise((resoleve, reject) => {
        if (this.inventory) {
          resoleve(this.inventory[propName])
        } else {
          this.loadInventory().then((inventory) => {
            this.inventory = inventory
            resoleve(this.inventory[propName])
          })
        }
      })
    }
  }

  guid() {
    const  s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  onDroneConfig() {
    this.props.navigator.push({
      title: 'Drones',
      component: InventoryList,
      passProps: { loadData: this.loadPropData('drones')  }
    })
  }

  onCameraConfig() {
    this.props.navigator.push({
      title: 'Cameras',
      component: InventoryList,
      passProps: { loadData: this.loadPropData('cameras')  }
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
