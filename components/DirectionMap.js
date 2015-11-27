import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer} from "react-google-maps";

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class DirectionMap extends Component {
  constructor(props, context) {
    super(props, context)
    console.log(this.props)
    this.state = {
      directions: null,
    }
  }

  componentDidMount() {
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
          directions: result
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    })
  }

  componentWillUpdate() {
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


  render () {
    const {origin, directions} = this.state;
    return (
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
    );
  }
}