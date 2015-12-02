import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer} from "react-google-maps"

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
class DirectionMap extends Component {
  constructor(props, context) {
    super(props, context)
    // console.log(this.props)
    this.state = {
      directions: null,
    }
  }

  _getDirection() {
    const origin =  new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong)
    const destination =  new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong)
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if(status == google.maps.DirectionsStatus.OK) {
        this.setState({
          origin: origin,
          directions: result
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    })
  }

  componentDidMount() {
    this._getDirection()
  }

  componentWillUpdate() {
    this._getDirection()
  }

  render () {
    const {origin, directions} = this.state;
    return (
      <GoogleMap containerProps={{
          ...this.props,
          style: {
            widht: "100%",
            height: "500px"
          },
        }}
        defaultZoom={7}
        defaultCenter={origin}>
        {directions ? <DirectionsRenderer directions={directions} /> : null}
      </GoogleMap>
    );
  }
}

DirectionMap.propTypes = {
  map: PropTypes.object.isRequired
}

export default DirectionMap
