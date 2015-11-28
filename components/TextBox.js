import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {default as React, Component} from "react"

export default class TextBox extends Component {
  constructor(props, context) {
    super(props, context)
    this._onDirectionSubmit = this._onDirectionSubmit.bind(this)
    this._onFundSubmit = this._onFundSubmit.bind(this)
  }

  _onDirectionSubmit(e) {
    const startLat = this.refs.startLat.getValue()
    const startLong = this.refs.startLong.getValue()
    const destLat = this.refs.destLat.getValue()
    const destLong = this.refs.destLong.getValue()
    // console.log(this.props.getDirection)
    this.props.getDirection({
      startLat: startLat,
      startLong: startLong,
      destLat: destLat,
      destLong: destLong
    })
  }

  _onFundSubmit(e) {
    const startLat = this.refs.startLat.getValue()
    const startLong = this.refs.startLong.getValue()
    const destLat = this.refs.destLat.getValue()
    const destLong = this.refs.destLong.getValue()
    const fundName = this.refs.fundName.getValue()
    const fundAmount = this.refs.fundAmount.getValue()
    this.props.addFund({
      startLat: startLat,
      startLong: startLong,
      destLat: destLat,
      destLong: destLong,
      fundName: fundName,
      fundAmount: fundAmount
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
            floatingLabelText="Fund Goal Amount ($)"
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
            label="Get Direction" 
            secondary={true} 
            onTouchTap={this._onDirectionSubmit}
          />
          <RaisedButton 
            label="Add Fund" 
            secondary={true} 
            onTouchTap={this._onFundSubmit}
          />
        </div>
    </div>
    )
  }
}