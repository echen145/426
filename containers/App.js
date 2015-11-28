import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import SimpleMap from '../components/SimpleMap'
import DirectionMap from '../components/DirectionMap'
import TextBox from '../components/TextBox'
import * as MapActions from '../actions/map'
const { updatePath } = require ('redux-simple-router')

function mapStateToProps(state) {
  return {
  	map: state.map
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MapActions, dispatch),
		updatePath: bindActionCreators(updatePath, dispatch) 
	}
}

class App extends Component {
	render() {
		const { map, updatePath, actions } = this.props
		console.log(actions)
		return (
			<div> 
				<NavBar updatePath={updatePath} />
				<DirectionMap map={map} />
				<TextBox getDirection={actions.getDirection} />
			</div>
		)
	}
}

App.propTypes = {
	map: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired, 
	updatePath: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)