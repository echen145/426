import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import NavBar from '../components/NavBar'
import Nav from '../components/Nav'
import * as CounterActions from '../actions/counter'
import * as NavActions from '../actions/nav'
const { updatePath } = require ('redux-simple-router');

function mapStateToProps(state) {
  return {
  	nav: state.nav
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(NavActions, dispatch),
		updatePath: updatePath
	}
}

class App extends Component {
	render() {
		const { nav, actions, updatePath } = this.props
		return (
			<div> 
				<NavBar updatePath={updatePath} />
			</div>
		)
	}
}

App.propTypes = {
	actions: PropTypes.object.isRequired, 
	updatePath: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
