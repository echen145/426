import React, { PropTypes, Component } from 'react'
import { TextField, RaisedButton, DatePicker, Snackbar } from 'material-ui'
import dateformat from 'dateformat'
import { postDonation } from '../utility/api'

class FundEditor extends Component {
  constructor(props, context) {
    super(props, context) 
    this._onAddSubmit = this._onAddSubmit.bind(this)
    this.handleDonationSubmit = this.handleDonationSubmit.bind(this)
    this.state = {
      errorText1: 'This field is required.',
      errorText2: 'This field must be numeric',
      autoHideDuration: 0
    }
  }

  handleDonationSubmit() {
    this.refs.snackbar.show()
  }

  _handleAction() {
    window.alert('Fund added!')
  }

  _onAddSubmit() {
    const name = this.refs.name.getValue()
    const amount = this.refs.amount.getValue()
    const date = this.refs.date.getDate()
    const donation = {
      name: name,
      amount: amount,
      date: dateformat(date, "m/dd/yy")
    } 
    postDonation(this.props.addToFund, this.props.token, this.props.fundId, donation)
    this.handleDonationSubmit()
  }

  _handleErrorInputChange(e) {
    this.setState({
      errorText1: e.target.value ? '' : 'This field is required.',
    })
  }

  _handleNumericErrorInputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorText2: isNumeric ? '' : 'This field must be numeric.',
    });
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

  render() {
    const styles = this.getStyles()
    return (
      <div className="container-fluid">
        <TextField 
          ref="name"
          floatingLabelText="Donor Name"
          errorText={this.state.errorText1}
          onChange={this._handleErrorInputChange.bind(this)}
          multiLine={true}
          styles={styles.textfield}
          errorStyle={styles.errorStyle}
        />
        <TextField 
          ref="amount"
          floatingLabelText="Contribution Amount ($)"
          defaultValue="0"
          errorText={this.state.errorText2}
          onChange={this._handleNumericErrorInputChange.bind(this)}
          multiLine={true}
          styles={styles.textfield}
          errorStyle={styles.errorStyle}
        />
        <DatePicker
          ref="date"
          hintText="Donation Date"
          container="inline"
          autoOk={true} />
        <RaisedButton 
          label="Add to Fund"
          secondary={true}
          onTouchTap={this._onAddSubmit}
        />
        <Snackbar
          ref="snackbar"
          message={'Donation added to your fund'}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this._handleAction} />
      </div>
    )
  }
}

FundEditor.propTypes = {
  addToFund: PropTypes.func.isRequired
}

export default FundEditor