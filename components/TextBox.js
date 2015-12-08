import {ClearFix, Mixins, TextField, RaisedButton, Snackbar, Dialog} from 'material-ui'
import {default as React, Component, PropTypes} from "react"
import { postResource } from '../constants/api'
const {StyleResizable} = Mixins

class TextBox extends Component {
  mixins: [StyleResizable]

  constructor(props, context) {
    super(props, context)
    this._onDirectionSubmit = this._onDirectionSubmit.bind(this)
    this._onFundSubmit = this._onFundSubmit.bind(this)
    this.handleFundSubmit = this.handleFundSubmit.bind(this)
    this._handleStandardDialogTouchTap = this._handleStandardDialogTouchTap.bind(this)
    this._handleRequestClose = this._handleRequestClose.bind(this)
    this.state ={
      modal: false,
      openDialogStandardActions: false,
      errorText: 'This field is required.',
      errorText2: 'This field must be numeric',
      startLatitudeErrText: 'This field must be a valid latitude (between -90 and 90)',
      destLatitudeErrText: 'This field must be a valid latitude (between -90 and 90)',
      startLongitudeErrText: 'This field must be a valid longitude (between -180 and 180)',      
      destLongitudeErrText: 'This field must be a valid longitude (between -180 and 180)',
      autoHideDuration: 0,
      message: 'Fund added to your list'
    }
  }

  handleFundSubmit() {
    this.refs.snackbar.show()
  }

  _handleAction() {
    window.alert('Fund added!')
  }

  getStyles() {
    let styles = {
      group: {
        width: '100%',
        marginBottom: 32
      },
      textfield: {
        marginTop: 12
      },
      errorStyle: {
        float: 'left'
      },
      buttons: {
        marginTop: 24
      }
    }

    return styles
  }

  _handleStandardDialogTouchTap() {
    this.setState({
      openDialogStandardActions: true,
    });
  }

  _handleRequestClose(buttonClicked) {
    if (!buttonClicked && this.state.modal) return;
    this.setState({
      openDialogStandardActions: false,
      openDialogCustomActions: false,
      openDialogScrollable: false,
    });
  }

  _onDirectionSubmit() {
    const startLat = this.refs.startLat.getValue()
    const startLong = this.refs.startLong.getValue()
    const destLat = this.refs.destLat.getValue()
    const destLong = this.refs.destLong.getValue()

    if(this._validateDirection(startLat, startLong, destLat, destLong)) {
      this.props.getDirection({
        startLat: startLat,
        startLong: startLong,
        destLat: destLat,
        destLong: destLong
      })      
    } else {
      this._handleStandardDialogTouchTap()
    }
  }

  _onFundSubmit() {
    const startLat = this.refs.startLat.getValue()
    const startLong = this.refs.startLong.getValue()
    const destLat = this.refs.destLat.getValue()
    const destLong = this.refs.destLong.getValue()
    const fundName = this.refs.fundName.getValue()
    const fundAmount = this.refs.fundAmount.getValue()

    if(this._validateInput(startLat, startLong, destLat, destLong, fundName, fundAmount)) {
      const fund = {
        map: {
          startLat: startLat,
          startLong: startLong,
          destLat: destLat,
          destLong: destLong,          
        },
        fundName: fundName,
        fundAmount: fundAmount,
        fundRaised: 0,
        donations: []
      }
      this.props.addFund(fund)
      postResource(fund, this.props.token)
      // this.props.updatePath()
      this.handleFundSubmit()
    } else {
      this._handleStandardDialogTouchTap()
    }
  }

  _validateInput(startLat, startLong, destLat, destLong, fundName, fundAmount) {
    return (
      this._validateLat(startLat) &&
      this._validateLat(destLat) &&
      this._validateLong(startLong) &&
      this._validateLong(destLong) &&
      this._validateName(fundName) &&
      this._validateNum(fundAmount)
    )
  }

  _validateDirection(startLat, startLong, destLat, destLong) {
    return (
      this._validateLat(startLat) &&
      this._validateLat(destLat) &&
      this._validateLong(startLong) &&
      this._validateLong(destLong)
    )
  }

  _validateLat(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && (value >= -90 && value <= 90)
  }

  _validateLong(value) {
    return !isNaN(parseFloat(value)) && isFinite(value) && (value >= -180 && value <= 180)
  }

  _validateName(value) {
    return value
  }

  _validateNum(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
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
    let styles = this.getStyles()
    let standardActions = [
      {text: 'Ok', ref: 'ok'},
    ]
    // console.log(this.state.message)
    return (
      <div>
        <Dialog
          ref="standardDialog"
          title="Message"
          actions={standardActions}
          actionFocus="ok"
          modal={this.state.modal}
          open={this.state.openDialogStandardActions}
          onRequestClose={this._handleRequestClose}>
          Please enter valid inputs.
        </Dialog>
        <ClearFix>
          <TextField
            ref="fundName"
            floatingLabelText="Fund Name"
            errorText={this.state.errorText}
            onChange={this._handleErrorInputChange.bind(this)}
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="fundAmount"
            floatingLabelText="Fund Goal Amount ($)"
            errorText={this.state.errorText2}
            onChange={this._handleNumericErrorInputChange.bind(this)}
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="startLat"
            floatingLabelText="Starting Location Latitude"
            errorText={this.state.startLatitudeErrText}
            onChange={this._handleLatitudeErrorInputChange.bind(this, 0)}
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="startLong"
            floatingLabelText="Starting Location Longitude"
            errorText={this.state.startLongitudeErrText}
            onChange={this._handleLongitudeErrorInputChange.bind(this, 0)}
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="destLat"
            floatingLabelText="Destination Location Latitude"
            errorText={this.state.destLatitudeErrText}
            onChange={this._handleLatitudeErrorInputChange.bind(this, 1)}
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="destLong"
            floatingLabelText="Destination Location Longitude"
            errorText={this.state.destLongitudeErrText}
            onChange={this._handleLongitudeErrorInputChange.bind(this, 1)}  
            multiLine={true} 
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
      </ClearFix>
        <div style={styles.buttons} >
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
        <Snackbar
          ref="snackbar"
          message={'Fund added to your list'}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleAction} />
      </div>
    )
  }
}

TextBox.propTypes = {
  getDirection: PropTypes.func.isRequired,
  addFund: PropTypes.func.isRequired,
  updatePath: PropTypes.func.isRequired
}

export default TextBox
