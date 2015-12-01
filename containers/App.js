import { bindActionCreators } from 'redux'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import Landing from '../components/Landing'
import * as MapActions from '../actions/map'
import * as FundActions from '../actions/fund'
import * as LoginActions from '../actions/login'
import * as SettingsActions from '../actions/settings'
import { updatePath } from 'redux-simple-router'

function mapStateToProps(state) {
  return {
  	map: state.map,
  	fund: state.fund,
  	login: state.login,
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(MapActions, dispatch),
		fundActions: bindActionCreators(FundActions, dispatch),
		loginActions: bindActionCreators(LoginActions, dispatch),
    settingsActions: bindActionCreators(SettingsActions, dispatch),
		updatePath: bindActionCreators(updatePath, dispatch) 
	}
}

class App extends Component {
	componentWillMount() {
		this.createLock()
		let idToken = this.getIdToken()
		if (idToken) {
			console.log(this.props)
			this.props.loginActions.login({
				idToken: idToken
			})
		}
	}

	createLock() {
		this.lock = new Auth0Lock('px52VJX59UvTobrMPIse4i9CJsPrSOsR', 'comp426.auth0.com')
	}

	getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash)
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token
        localStorage.setItem('userToken', authHash.id_token)
      }
      if (authHash.error) {
        console.log("Error signing in", authHash)
        return null
      }		
		}
		return idToken
	}

	render() {
		const { 
      map, fund, 
      login, updatePath, 
      actions, fundActions, 
      loginActions, settingsActions 
    } = this.props
		console.log(this.props.loginActions)
		// console.log(this.props)
		// console.log(this.state.idToken)

		let app
		console.log(login.loggedIn)
		if(login.loggedIn) {
			app = (
				<div> 
					<NavBar updatePath={updatePath} loginActions={loginActions} />
					<div className="app">
						{this.props.children && React.cloneElement(this.props.children, 
							{ 
								map: map, 
								fund: fund, 
								actions: actions, 
								fundActions: fundActions,
                settingsActions: settingsActions,
								updatePath: updatePath })}
					</div>
				</div>				
			)
		} else {
			app = (
        <Landing
          lock={this.lock}
          loginActions={loginActions} />	
			)
		}

		console.log(app)

		return (
			<div>
				{app}
			</div>		
		)
	}
}

App.propTypes = {
	map: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired, 
	fundActions: PropTypes.object.isRequired,
  settingsActions: PropTypes.object.isRequired,
	updatePath: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)