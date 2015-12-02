import {default as React, Component} from "react"

import {GoogleMapLoader, GoogleMap} from "react-google-maps"

export default class SimpleMap extends Component {
  render () {
    return (
      <div className="gmap">
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              width: "450px",
              height: "450px"
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={15}
            defaultCenter={{lat: 35.912031, lng: -79.051305}}>
          </GoogleMap>
        }
      />
      </div>
    )
  }
}