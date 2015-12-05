import React, { PropTypes, Component } from 'react'
import { TextField, RaisedButton } from 'material-ui'

class FundEditor extends Component {
  constructor(props, context) {
    super(props, context) 
    this._onAddSubmit = this._onAddSubmit.bind(this)
    this.state = {
      errorText: 'This field must be numeric'
    }
  }

  _onAddSubmit() {
    const amount = this.refs.amount.getValue()
    this.props.addToFund(amount)  
  }

  _handleNumericErrorInputChange(e) {
    let value = e.target.value;
    let isNumeric = !isNaN(parseFloat(value)) && isFinite(value);
    this.setState({
      errorText: isNumeric ? '' : 'This field must be numeric.',
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
      <div>
        <TextField 
          ref="amount"
          floatingLabelText="Contribution Amount ($)"
          defaultValue="0"
          errorText={this.state.errorText}
          onChange={this._handleNumericErrorInputChange.bind(this)}
          multiLine={true}
          styles={styles.textfield}
          errorStyle={styles.errorStyle}
        />
        <RaisedButton 
          label="Add to Fund"
          secondary={true}
          onTouchTap={this._onAddSubmit}
        />
      </div>
    )
  }
}

FundEditor.propTypes = {
  addToFund: PropTypes.func.isRequired
}

export default FundEditor