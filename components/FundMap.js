import React, { Component, PropTypes } from 'react'
import {GoogleMap, DirectionsRenderer, Marker, InfoWindow } from "react-google-maps"


class FundMap extends Component {
  constructor(props, context) {
    super(props, context)
    // console.log(this.props.map)
    let markers = null
    this.state = {
      origin: new google.maps.LatLng(this.props.map.startLat, this.props.map.startLong),
      destination: new google.maps.LatLng(this.props.map.destLat, this.props.map.destLong),
      directions: null,
      polyline: null,
      markers: markers
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
        let markers = null
        if(this.props.fund.donations) {
          markers = this.getMarkers(this.props.fund, polyline)
        }        
        this.setState({
          directions: result, 
          polyline: polyline, 
          markers: markers
        })
      }
      else {
        console.error(`error fetching directions ${ result }`);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.fund !== nextProps.fund) {
      if(this.state.polyline) {
        const markers = this.getMarkers(nextProps.fund, this.state.polyline)
        this.setState({
          markers: markers
        })

      }
    }
  }

  getMarkers(fund, polyline) {
    let percent = 0
    let latlng = null   
    const total = fund['fundAmount']
    const donations = fund['donations'] ? fund['donations'] : []
    let markers = []
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
    return markers
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
      <InfoWindow key={`${ref}_info_window`}
        onCloseclick={this.handleCloseClick.bind(this, marker)}
      >
        <div>
          <strong>{marker.title}</strong>
          <br />
          <em>{"$" + marker.content + " "}</em>
        </div>
      </InfoWindow>
    )
  }

  render () {
    const {origin, directions, polyline} = this.state;
    let markerProps = null
    if(this.state.markers) {
      markerProps = this.state.markers.map((marker, index) => {
        const ref = `marker_${index}`
        return (
          <Marker 
            key={ref} 
            ref={ref}
            onClick={this.handleMarkerClick.bind(this, marker)}
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
          {(polyline && markerProps)?  markerProps : null }
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
