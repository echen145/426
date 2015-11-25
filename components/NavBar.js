import AppBar from 'material-ui/lib/app-bar'
import React, { PropTypes, Component } from 'react'

export default class NavBar extends Component {
	render() {
		return (
			<AppBar
				title="App"
				iconClassNameRight="muidocs-icon-navigation-expand-more" />
		)
	}
}