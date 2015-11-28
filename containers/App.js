import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import SimpleMap from '../components/SimpleMap'
import DirectionMap from '../components/DirectionMap'
import TextBox from '../components/TextBox'
import FundList from '../components/FundList'
import * as MapActions from '../actions/map'
import * as FundActions from '../actions/fund'
const { updatePath } = require ('redux-simple-router')

function mapStateToProps(state) {
  return {
  	map: state.map,
  	fund: state.fund
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MapActions, dispatch),
		fundActions: bindActionCreators(FundActions, dispatch),
		updatePath: bindActionCreators(updatePath, dispatch) 
	}
}

class App extends Component {
	render() {
		const { map, fund, updatePath, actions, fundActions } = this.props
		// console.log(this.props)
		return (
			<div> 
				<NavBar updatePath={updatePath} />
				<DirectionMap map={map} />
				<TextBox getDirection={actions.getDirection} addFund={fundActions.addFund} />
				<FundList funds={fund} />
			</div>
		)
	}
}

App.propTypes = {
	map: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired, 
	fundActions: PropTypes.object.isRequired,
	updatePath: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)