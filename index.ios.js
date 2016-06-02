
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  SegmentedControlIOS,
  PickerIOS,
  PickerItemIOS,
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

      drones          : [
        { name: 'Drone 1', UUID: '1' },
        { name: 'Drone 2', UUID: '2' },
        { name: 'Drone 3', UUID: '3' }
      ],
      cameras         : [
        { name: 'Cam 1', UUID: '1' },
        { name: 'Cam 2', UUID: '2' },
      ]
    }
    this.state.drone  = this.state.drones[0]
    this.state.camera = this.state.cameras[0]

    this.onPushPressed    = this.onPushPressed.bind(this)
    this.onSegmentChanged = this.onSegmentChanged.bind(this)
    this.onDroneChangd    = this.onDroneChangd.bind(this)
    this.onCameraChangd   = this.onCameraChangd.bind(this)
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

  onDroneChangd(drone) {
    this.setState({drone: drone})
  }

  onCameraChangd(camera) {
    this.setState({camera: camera})
  }

  renderDronePicker() {
    const drone = this.state.drone || this.state.drones[0]

    return (
      <PickerIOS
        selectedValue={drone}
        onValueChange={this.onDroneChangd}>

        {
          this.state.drones.map((drone) =>
            <PickerIOS.Item
              key={drone.UUID}
              value={drone}
              label={drone.name}
            />
          )
        }
      </PickerIOS>
    )
  }

  renderCameraPicker() {
    const camera = this.state.camera || this.state.cameras[0]

    return (
      <PickerIOS
        selectedValue={camera}
        onValueChange={this.onCameraChangd}>

        {
          this.state.cameras.map((camera) =>
            <PickerIOS.Item
              key={camera.UUID}
              value={camera}
              label={camera.name}
            />
          )
        }
      </PickerIOS>
    )
  }

  render() {
    const tempValue     = this.state.temp || '--'
    const btnLabel      = this.state.started ? 'Stop' : 'Start'
    const btnColorStyle = {
      backgroundColor: this.state.started ? '#b62711' : 'green'
    }

    const drones     = this.state.drones || []
    const pickerView = this.state.segmentIndex === 0
      ? this.renderDronePicker()
      : this.renderCameraPicker()

    return (
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <SegmentedControlIOS
            values={['Drone', 'Camera']}
            selectedIndex={this.state.segmentIndex}
            onChange={this.onSegmentChanged} />

          {pickerView}
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
