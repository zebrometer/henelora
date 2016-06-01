
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View } from 'react-native';

const API_KEY = `f93fb24be5ca6fb258e138cb9d8d6406`

class Henelora extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition : 'unknown',
      lastPosition    : 'unknown'
    }
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

  render() {
    const tempValue = this.state.temp || '--'

    return (
      <View style={styles.container}>
        <Text>
          <Text>Temperature: </Text>
          {tempValue} F
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  }
});

AppRegistry.registerComponent('henelora', () => Henelora);
