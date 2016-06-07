
import React   from 'react'
import {
  StyleSheet,
  ListView,
  View,
  Image,
  Text
}  from 'react-native'

import SettingsList from 'react-native-settings-list'


export default class InventoryList extends React.Component {
  static propTypes : {
    loadData: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      drones : [],
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    this.renderRow       = this.renderRow.bind(this)
    this.renderSeparator = this.renderSeparator.bind(this)
  }

  componentDidMount() {
    this.props.loadData().then((drones) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(drones)
      })
    })
  }

  renderRow(drone, sectionID, rowID) {
    return (
      <View style={styles.rowStyle}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text>{drone.name}</Text>
            <Text  style={styles.rowInfoStyle}>{drone.uuid}</Text>
          </View>
          <View>
            <Image style={styles.imageStyle} source={require('./img/info-16.png')} />
          </View>
        </View>
      </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? .5 : .5,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    )
  }

  render() {
    const drones     = this.state.drones
    const dataSource = this.state.dataSource

    return (
      <View style={styles.container}>
        <ListView
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          dataSource={dataSource}>
        </ListView>
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
    paddingTop: 15
  },
  rowStyle: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15
  },
  rowInfoStyle: {
    fontSize: 9,
    paddingTop: 5,
    color: '#AAA'
  },
  imageStyle: {
    marginTop: 10
  }
})
