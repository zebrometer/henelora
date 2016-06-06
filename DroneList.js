
import React   from 'react'
import {
  StyleSheet,
  View,
  Text }       from 'react-native'

import SettingsList from 'react-native-settings-list'


export default class DroneList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {drones : [] }
  }

  componentDidMount() {
    const drones = [
      { name: 'Drone 1', uuid: this.guid() },
      { name: 'Drone 2', uuid: this.guid() },
      { name: 'Drone 3', uuid: this.guid() },
      { name: 'Drone 4', uuid: this.guid() },
      { name: 'Drone 5', uuid: this.guid() },
      { name: 'Drone 6', uuid: this.guid() },
      { name: 'Drone 7', uuid: this.guid() }
    ]
    this.setState({drones: drones})
  }

  guid() {
    const  s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }

  render() {
    const drones = this.state.drones

    return (
      <View style={styles.container}>
        <SettingsList>
          {
            drones.map((drone) =>
              <SettingsList.Item
                  key={drone.uuid}
                  hasNavArrow={false}
                  switchState={false}
                  hasSwitch={false}
                  titleInfo={drone.uuid}
                  titleInfoStyle={styles.titleInfo}
                  switchOnValueChange={() => {}}
                  title={drone.name}/>
            )
          }
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
  },
  titleInfo: {
    fontSize: 9
  }
})
