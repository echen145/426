import {ClearFix, Mixins, TextField, RaisedButton, Snackbar, Dialog} from 'material-ui'
import {default as React, Component, PropTypes} from "react"
import { postFund } from '../utility/api'
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
      startStreetErrText: 'This field must be a valid street',
      destStreetErrText: 'This field must be a valid street',
      startCityErrText: 'This field must be a valid city',
      destCityErrText: 'This field must be a valid city',
      startStateErrText: 'This field must be a valid state',
      destStateErrText: 'This field must be a valid state',
      StreetErrText: 'This field must be a valid street',
      CityErrText: 'This field must be a valid city',
      StateErrText: 'This field must be a valid state',
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
    const startStreet = this.refs.startStreet.getValue()
    const startCity = this.refs.startCity.getValue()
    const startState = this.refs.startState.getValue()
    const destStreet = this.refs.destStreet.getValue()
    const destCity = this.refs.destCity.getValue()
    const destState = this.refs.destState.getValue()

    var startAddress = startStreet+", "+startCity+", "+startState;
    var destAddress = destStreet+", "+destCity+", "+destState;

    const that = this;

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': startAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        const startLat = results[0].geometry.location.lat();
        const startLong = results[0].geometry.location.lng();

        geocoder.geocode( { 'address': destAddress}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const destLat = results[0].geometry.location.lat();
            const destLong = results[0].geometry.location.lng();

            if(that._validateDirection(startLat, startLong, destLat, destLong)) {
              that.props.getDirection({
                startLat: startLat,
                startLong: startLong,
                destLat: destLat,
                destLong: destLong
              })
            } else {
              that._handleStandardDialogTouchTap()
            }

          }
        });

      }
    });
  }

  _onFundSubmit() {
    const startStreet = this.refs.startStreet.getValue()
    const startCity = this.refs.startCity.getValue()
    const startState = this.refs.startState.getValue()
    const destStreet = this.refs.destStreet.getValue()
    const destCity = this.refs.destCity.getValue()
    const destState = this.refs.destState.getValue()
    const fundName = this.refs.fundName.getValue()
    const fundAmount = this.refs.fundAmount.getValue()

    var startAddress = startStreet+", "+startCity+", "+startState;
    var destAddress = destStreet+", "+destCity+", "+destState;

    const that = this;

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': startAddress}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        const startLat = results[0].geometry.location.lat();
        const startLong = results[0].geometry.location.lng();

        geocoder.geocode( { 'address': destAddress}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const destLat = results[0].geometry.location.lat();
            const destLong = results[0].geometry.location.lng();

            if(that._validateInput(startLat, startLong, destLat, destLong, fundName, fundAmount)) {
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
              // this.props.addFund(fund)
              postFund(that.props.addFund, fund, that.props.token)
              // this.props.updatePath()
              that.handleFundSubmit()
            } else {
              that._handleStandardDialogTouchTap()
            }
          }
        });
      }
    });
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

  _handleStreetErrorInputChange(e) {
    this.setState({
      startStreetErrText: e.target.value ? '' : 'This field must be a valid street.',
    })
  }

  _handleCityErrorInputChange(e) {
    this.setState({
      startCityErrText: e.target.value ? '' : 'This field must be a valid city.',
    })
  }

  _handleStateErrorInputChange(e) {
    this.setState({
      startStateErrText: e.target.value ? '' : 'This field must be a valid state.',
    })
  }

  _handleStreetErrorInputChange2(e) {
    this.setState({
      destStreetErrText: e.target.value ? '' : 'This field must be a valid street.',
    })
  }

  _handleCityErrorInputChange2(e) {
    this.setState({
      destCityErrText: e.target.value ? '' : 'This field must be a valid city.',
    })
  }

  _handleStateErrorInputChange2(e) {
    this.setState({
      destStateErrText: e.target.value ? '' : 'This field must be a valid state.',
    })
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
            ref="startStreet"
            floatingLabelText="Starting Location Street"
            errorText={this.state.startStreetErrText}
            onChange={this._handleStreetErrorInputChange.bind(this)}
            multiLine={true}
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="startCity"
            floatingLabelText="Starting Location City"
            errorText={this.state.startCityErrText}
            onChange={this._handleCityErrorInputChange.bind(this)}
            multiLine={true}
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="startState"
            floatingLabelText="Starting Location State"
            errorText={this.state.startStateErrText}
            onChange={this._handleStateErrorInputChange.bind(this)}
            multiLine={true}
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="destStreet"
            floatingLabelText="Destination Location Street"
            errorText={this.state.destStreetErrText}
            onChange={this._handleStreetErrorInputChange2.bind(this)}
            multiLine={true}
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="destCity"
            floatingLabelText="Destination Location City"
            errorText={this.state.destCityErrText}
            onChange={this._handleCityErrorInputChange2.bind(this)}
            multiLine={true}
            styles={styles.textfield}
            errorStyle={styles.errorStyle}
          />
          <TextField
            ref="destState"
            floatingLabelText="Destination Location State"
            errorText={this.state.destStateErrText}
            onChange={this._handleStateErrorInputChange2.bind(this)}
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