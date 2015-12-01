import React, { Component, PropTypes } from 'react'
import DirectionMap from '../components/DirectionMap'
import TextBox from '../components/TextBox'
import FundList from '../components/FundList'

export default class MainScreen extends Component {
  render() {
    // console.log(this.props)
    let styles = {
      main: {
        marginLeft: 10,
        marginTop: 10
      }
    }
    return (
      <div style={styles.main} > 
        <DirectionMap map={this.props.map} />
        <TextBox 
          updatePath={this.props.updatePath} 
          getDirection={this.props.actions.getDirection} 
          addFund={this.props.fundActions.addFund} />
      </div>
    )
  }
}