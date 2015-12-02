import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer} from "react-google-maps"

class FundMap extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      origin: new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong),
      destination: new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong),
      directions: null,
    }
  }

  componentDidMount() {
    const DirectionsService = new google.maps.DirectionsService()
    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result, status) => {
      if(status == google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    })
  }

  render () {
    const {origin, directions} = this.state;
    return (
      <div id="map">
        <GoogleMap containerProps={{
            ...this.props,
            style: {
              width: "100%",
              height: "500px"
            },
          }}
          defaultZoom={7}
          defaultCenter={origin}>
          {directions ? <DirectionsRenderer directions={directions} /> : null}
        </GoogleMap>
      </div>
    );
  }
}

FundMap.propTypes = {
  map: PropTypes.object.isRequired
}

export default FundMap
