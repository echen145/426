import React, { Component, PropTypes } from 'react'
import DirectionMap from '../components/DirectionMap'
import TextBox from '../components/TextBox'
import FundList from '../components/FundList'

export default class MainScreen extends Component {
  render() {
    console.log(this.props)
    return (
      <div> 
        <DirectionMap map={this.props.map} />
        <TextBox getDirection={this.props.actions.getDirection} addFund={this.props.fundActions.addFund} />
      </div>
    )
  }
}