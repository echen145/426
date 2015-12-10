import { List, ListDivider, ListItem, IconButton, IconMenu, Styles } from 'material-ui'
import React, {Component, PropTypes} from 'react'
const {Colors} = Styles;
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const MenuItem = require('material-ui/lib/menus/menu-item')
import {deleteFund} from '../utility/api'

class FundList extends Component {
  constructor() {
    super()
  }

  handleClick(index, fund) {
    console.log(index)
    console.log(fund)
    deleteFund(this.props.deleteFund, this.props.token, fund)
  }

  render() {
    const funds = this.props.funds
    console.log(funds)
    return (
      <List subheader="Funds">
        {Object.keys(funds).map((fund, index) => {
          let iconButtonElement = (
            <IconButton
              touch={true}
              tooltip="more"
              tooltipPosition="bottom-left">
              <MoreVertIcon color={Colors.grey400} />
            </IconButton>
          );

          let rightIconMenu = (
            <IconMenu 
              iconButtonElement={iconButtonElement}
              onItemTouchTap={this.handleClick.bind(this, index, fund)}
            >
              <MenuItem 
                primaryText="Delete" 
              />
            </IconMenu>
          );
          return (
            <div>
              <ListItem
                primaryText={funds[fund].fundName}
                secondaryText={<p>Goal: ${funds[fund].fundAmount}</p>}
                secondaryTextLines={1} 
                key={index}
                rightIconButton={rightIconMenu}
                onTouchTap={this.props.onClick.bind(this, index)} />
               <ListDivider />
            </div>
          )
        }

          )}
      </List>
    )
  }
}

FundList.propTypes = {
  funds: PropTypes.array.isRequired,
  updatePath: PropTypes.func.isRequired
}

export default FundList
