import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'
import {default as React, Component} from "react"

export default class TextBox extends Component {
  constructor(props, context) {
    super(props, context)
    this._onDirectionSubmit = this._onDirectionSubmit.bind(this)
    this._onFundSubmit = this._onFundSubmit.bind(this)
    this.state ={
      errorText: 'This field is required.',
      errorText2: 'This field must be numeric',
      startLatitudeErrText: 'This field must be a valid latitude (between -90 and 90)',
      destLatitudeErrText: 'This field must be a valid latitude (between -90 and 90)',
      startLongitudeErrText: 'This field must be a valid longitude (between -180 and 180)',      
      destLongitudeErrText: 'This field must be a valid longitude (between -180 and 180)'
    }
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
      fundAmount: fundAmount,
      fundRaised: 0
    })
  }

  _handleErrorInputChange(e) {
    this.setState({
      errorText: e.target.value ? '' : 'This field is required.',
    })
  }

  _handleNumericErrorInputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorText2: isNumeric ? '' : 'This field must be numeric.',
    });
  }

  _handleLatitudeErrorInputChange(i, e) {
    let value = e.target.value;
    // console.log(value)
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value) && (value >= -90 && value <= 90);
    if(i == 0) {
      this.setState({
        startLatitudeErrText: isNumeric ? '' : 'This field must be a valid latitude (between -90 and 90)',
      });      
    } else{
      this.setState({
        destLatitudeErrText: isNumeric ? '' : 'This field must be a valid latitude (between -90 and 90)',
      });         
    }

  }

  _handleLongitudeErrorInputChange(i, e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value) && (value >= -180 && value <= 180);
    if(i == 0) {
      this.setState({
        startLongitudeErrText: isNumeric ? '' : 'This field must be a valid longitude (between -180 and 180)',
      });      
    } else {
      this.setState({
        destLongitudeErrText: isNumeric ? '' : 'This field must be a valid longitude (between -180 and 180)',
      });          
    }

  }

  render() {
    return (
      <div className="textbox">
        <div>
          <TextField
            ref="fundName"
            floatingLabelText="Fund Name"
            errorText={this.state.errorText}
            onChange={this._handleErrorInputChange.bind(this)}
            multiLine={true} 
          />
          <TextField
            ref="fundAmount"
            floatingLabelText="Fund Goal Amount ($)"
            errorText={this.state.errorText2}
            onChange={this._handleNumericErrorInputChange.bind(this)}
            multiLine={true} 
          />
        </div>
        <div>
          <TextField
            ref="startLat"
            floatingLabelText="Starting Location Latitude"
            errorText={this.state.startLatitudeErrText}
            onChange={this._handleLatitudeErrorInputChange.bind(this, 0)}
            multiLine={true} 
          />
          <TextField
            ref="startLong"
            floatingLabelText="Starting Location Longitude"
            errorText={this.state.startLongitudeErrText}
            onChange={this._handleLongitudeErrorInputChange.bind(this, 0)}
            multiLine={true} 
          />
        </div>
        <div>
          <TextField
            ref="destLat"
            floatingLabelText="Destination Location Latitude"
            errorText={this.state.destLatitudeErrText}
            onChange={this._handleLatitudeErrorInputChange.bind(this, 1)}
            multiLine={true} 
          />
          <TextField
            ref="destLong"
            floatingLabelText="Destination Location Longitude"
            errorText={this.state.destLongitudeErrText}
            onChange={this._handleLongitudeErrorInputChange.bind(this, 1)}  
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