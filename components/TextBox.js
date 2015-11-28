import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {default as React, Component} from "react"

export default class TextBox extends Component {
  constructor(props, context) {
    super(props, context)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    const startLat = this.refs.startLat.getValue()
    const startLong = this.refs.startLong.getValue()
    const destLat = this.refs.destLat.getValue()
    const destLong = this.refs.destLong.getValue()
    console.log(this.props.getDirection)
    this.props.getDirection({
      startLat: startLat,
      startLong: startLong,
      destLat: destLat,
      destLong: destLong
    })
  }

  render() {
    return (
      <div className="textbox">
        <div>
          <TextField
            ref="fundName"
            floatingLabelText="Fund Name"
            multiLine={true} 
          />
          <TextField
            ref="fundAmount"
            floatingLabelText="Fund Goal Amount"
            multiLine={true} 
          />
        </div>
        <div>
          <TextField
            ref="startLat"
            floatingLabelText="Starting Location Latitude"
            multiLine={true} 
          />
          <TextField
            ref="startLong"
            floatingLabelText="Starting Location Longitude"
            multiLine={true} 
          />
        </div>
        <div>
          <TextField
            ref="destLat"
            floatingLabelText="Destination Location Latitude"
            multiLine={true} 
          />
          <TextField
            ref="destLong"
            floatingLabelText="Destination Location Longitude"
            multiLine={true} 
          />
        </div>
        <div>
          <RaisedButton 
            label="Add Fund" 
            secondary={true} 
            onTouchTap={this.onSubmit}
          />
        </div>
    </div>
    )
  }
}