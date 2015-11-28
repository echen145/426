import {default as React, Component} from "react"

import {GoogleMapLoader, GoogleMap} from "react-google-maps"
/*
 * Sample From: https://developers.google.com/maps/documentation/javascript/examples/map-simple
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class SimpleMap extends Component {
  /*
   * 1. Create a component that wraps all your map sub-components.
   */
  render () {
    /*
     * 2. Render GoogleMap component with containerProps
     */
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