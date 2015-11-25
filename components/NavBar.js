import AppBar from 'material-ui/lib/app-bar'
import React, { PropTypes, Component } from 'react'
import LeftNav from 'material-ui/lib/left-nav'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();




export default class NavBar extends Component {
	constructor() {
	    super();
	    this._toggleNav = this._toggleNav.bind(this);
  	}

	_toggleNav(e) {
		e.preventDefault()
		console.log("toggle")
		console.log(this.refs)
		this.refs.leftNav.toggle()
	}

	render() {
		const menuItems = [
		  { route: '/home', text: 'Home' },
		  { route: '/settings', text: 'Settings' }
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
			        menuItems={menuItems} 
		      	/>
			</div>
		)
	}
}
