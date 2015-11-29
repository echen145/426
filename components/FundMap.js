import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer} from "react-google-maps"

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class FundMap extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      origin: new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong),
      destination: new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong),
      directions: null,
    }
    // console.log(this.state)
  }

  componentDidMount() {
    // console.log('mounting')
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
              width: "450px",
              height: "450px"
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