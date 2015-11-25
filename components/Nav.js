import React, { PropTypes, Component } from 'react'
import LeftNav from 'material-ui/lib/left-nav'

const menuItems = [
  { route: '/home', text: 'Home' },
  { route: '/settings', text: 'Settings' }
]

export default class Nav extends Component {
	render() {
		return (
			<LeftNav 
        ref="leftNav" 
        docked={false} 
        menuItems={menuItems} 
      />
		)
	}
}