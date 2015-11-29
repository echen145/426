import AppBar from 'material-ui/lib/app-bar'
import React, { PropTypes, Component } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default class NavBar extends Component {
	constructor() {
	    super()
	    this._toggleNav = this._toggleNav.bind(this);
	    this._handleLeftNavChange = this._handleLeftNavChange.bind(this)
	}

	_handleLeftNavChange(e, selectedIndex, menuItem) {
		// console.log(menuItem.route)
		this.props.updatePath(menuItem.route, false)
		this.refs.leftNav.toggle()
	}

	_toggleNav(e) {
		e.preventDefault()
		// console.log("toggle")
		// console.log(this.refs)
		this.refs.leftNav.toggle()
	}

	render() {
		const menuItems = [
			{ key: 0, route: '/', text: 'Home' },
		  { key: 1, route: '/funds', text: 'Funds' },
		  { key: 2, route: '/settings', text: 'Settings' }
		]

		return (
			<div className="nav">
				<AppBar
					title="App"
					iconClassNameRight="muidocs-icon-navigation-expand-more" 
					onLeftIconButtonTouchTap={this._toggleNav} 
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
