import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer, Marker} from "react-google-maps"


class FundMap extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      origin: new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong),
      destination: new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong),
      directions: null,
      polyline: null
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
        let polyline = new google.maps.Polyline({
          path: [],
          strokeColor: '#FF0000',
          strokeWeight: 3
        });
        const legs = result.routes[0].legs
        for (let i=0;i<legs.length;i++) {
          let steps = legs[i].steps;
          for (let j=0;j<steps.length;j++) {
            let nextSegment = steps[j].path;
            for (let k=0;k<nextSegment.length;k++) {
              polyline.getPath().push(nextSegment[k]);
            }
          }
        }
        this.setState({
          directions: result, 
          polyline: polyline
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    })
  }

  render () {
    const {origin, directions, polyline} = this.state;
    let dists = []
    let percent = 0
    const total = this.props.fund['fundAmount']
    const donations = this.props.fund['donations']
    let latlng = null

    if(polyline) {
      for (let i = 0; i < donations.length; i++) {
        percent = percent + (donations[i].amount)/total    
        latlng = polyline.GetPointAtDistance(polyline.Distance()*percent)
        dists.push(latlng)
      }
    }


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
          {polyline ?  (dists.map((latlng) => <Marker defaultPosition={latlng} />)) : null }
        </GoogleMap>
      </div>
    );
  }
}

FundMap.propTypes = {
  map: PropTypes.object.isRequired,
  fund: PropTypes.object.isRequired
}

export default FundMap
