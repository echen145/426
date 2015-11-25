import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Counter from '../components/Counter'
import NavBar from '../components/NavBar'
import * as CounterActions from '../actions/counter'

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch)
}

class App extends Component {
	render() {
		const { counter } = this.props
		return (
			<div> 
				<NavBar />
				<Counter counter={counter} />
			</div>
		)
	}
}

App.propTypes = {
	counter: PropTypes.number
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
