import React, { PropTypes, Component } from 'react'
import { 
	LeftNav, 
	AppBar, 
	FlatButton } from 'material-ui'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class NavBar extends Component {
	constructor() {
	    super()
	    this._toggleNav = this._toggleNav.bind(this);
	    this._handleLeftNavChange = this._handleLeftNavChange.bind(this)
	    this._handleSignOut = this._handleSignOut.bind(this)
	    this._handleIconMenuChange = this._handleIconMenuChange.bind(this)
	}

	_handleLeftNavChange(e, selectedIndex, menuItem) {
		// console.log(menuItem.route)
		this.props.updatePath(menuItem.route, false)
		this.refs.leftNav.toggle()
	}

	_handleSignOut() {
		// e.preventDefault()
		// console.log(this.props.loginActions)
		localStorage.removeItem('userToken')
		this.props.loginActions.logout()
		this.props.updatePath('/')
	}

	_toggleNav(e) {
		e.preventDefault()
		// console.log("toggle")
		// console.log(this.refs)
		this.refs.leftNav.toggle()
	}

	_handleIconMenuChange(e, val) {
		if (val == 1) {
			this._handleSignOut()
		}
	}

	render() {
		const menuItems = [
			{ key: 0, route: '/', text: 'Home' },
		  { key: 1, route: '/funds', text: 'Funds' },
		  { key: 2, route: '/settings', text: 'Settings' }
		]

		let button = (
			<FlatButton 
				label="Sign Out"
				onTouchTap={this._handleSignOut} />
		)

		return (
			<div className="nav">
				<AppBar
					title="App"
					iconClassNameRight="muidocs-icon-navigation-expand-more" 
					onLeftIconButtonTouchTap={this._toggleNav} 
          iconElementRight={button}
				/>
				<LeftNav 
			        ref="leftNav" 
			        docked={false}
			        onChange={this._handleLeftNavChange}
			        menuItems={menuItems} 
		      	/>
			</div>
		)
	}
}

NavBar.propTypes = {
	updatePath: PropTypes.func.isRequired,
	loginActions: PropTypes.object.isRequired
}

export default NavBar
