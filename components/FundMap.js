import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps"


class FundMap extends Component {
  constructor(props, context) {
    super(props, context)
    console.log(this.props.map)
    this.state = {
      origin: new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong),
      destination: new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong),
      directions: null,
      polyline: null,
      markers: null
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


  handleMarkerClick(marker) {
    marker.showInfo = true
    this.setState(this.state)
  }

  handleCloseClick(marker) {
    marker.showInfo = false
    this.setState(this.state)
  }

  renderInfoWindow (ref, marker) {
    return (
      <InfoWindow key={`${ref}_info_window`}>
        <div>
          <strong>{marker.title}</strong>
          <br />
          <em>${marker.content}</em>
        </div>
      </InfoWindow>
    )
  }

  render () {
    const {origin, directions, polyline} = this.state;
    let markers = []
    let percent = 0
    const total = this.props.fund['fundAmount']
    const donations = this.props.fund['donations'] ? this.props.fund['donations'] : []
    let latlng = null
    let markerProps = null

    if(polyline) {
      Object.keys(donations).map((donation, index) => {
        percent = percent + (donations[donation].amount)/total    
        latlng = polyline.GetPointAtDistance(polyline.Distance()*percent)
        markers.push({
          pos: latlng,
          title: donations[donation].name,
          content: donations[donation].amount,
          showInfo: true
        })        
      })

      markerProps = markers.map((marker, index) => {
        const ref = `marker_${index}`
        return (
          <Marker 
            key={ref} 
            ref={ref}
            position={marker.pos}>
            {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
          </Marker>
          )        
      })

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
          {(polyline)?  markerProps : null }
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
