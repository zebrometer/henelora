
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  SegmentedControlIOS,
  Text,
  View } from 'react-native'

import Button from 'react-native-button'

const API_KEY = `f93fb24be5ca6fb258e138cb9d8d6406`

class Henelora extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition : 'unknown',
      lastPosition    : 'unknown',
      segmentIndex    : 0,
      started         : false,
    }

    this.onPushPressed    = this.onPushPressed.bind(this)
    this.onSegmentChanged = this.onSegmentChanged.bind(this)
  }

  componentDidMount() {
    this.getInitialPosition()
    this.watchPosition()
  }

  getInitialPosition() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ initialPosition: JSON.stringify(position) })
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        lat =  34.04
        lon = -84.13

        //const REQUEST_URL = "https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json"
        //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit
        const REQUEST_URL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial`
        fetch(REQUEST_URL)
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({ temp: responseData.main.temp })
          })
          .done()
      },
      (error) => {
        console.error(error)
      }
    )
  }

  watchPosition() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({lastPosition : JSON.stringify(position)})
    })
  }

  componentWillUnmount() {
    this.watchID && navigator.geolocation.clearWatch(this.watchID)
  }

  onPushPressed() {
    this.setState({ started: !this.state.started })
  }

  onSegmentChanged(event) {
    this.setState({segmentIndex: event.nativeEvent.selectedSegmentIndex})
  }

  render() {
    const tempValue     = this.state.temp || '--'
    const btnLabel      = this.state.started ? 'Stop' : 'Start'
    const btnColorStyle = {
      backgroundColor: this.state.started ? '#b62711' : 'green'
    }

    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <SegmentedControlIOS
            values={['Drone', 'Camera']}
            selectedIndex={this.state.segmentIndex}
            onChange={this.onSegmentChanged} />
        </View>

        <View style={styles.triggerContainer}>
          <Text>
            <Text>Temperature: </Text>
            {tempValue} F
          </Text>

          <Button containerStyle={[styles.buttonContainer, btnColorStyle]} style={styles.button} onPress={this.onPushPressed}>
            {btnLabel}
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  optionsContainer: {
    flex: 1,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },

  triggerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#F5FCFF',
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',

    marginTop: 35,
  },

  buttonContainer: {
    padding:20,
    width: 200,
    overflow:'hidden',
    borderRadius:40
  },
  button: {
    fontSize: 20,
    color: 'white'
  }
});

AppRegistry.registerComponent('henelora', () => Henelora);
