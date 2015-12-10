import React, { PropTypes, Component } from 'react'
import { List, ListDivider, ListItem, IconButton, IconMenu, Styles } from 'material-ui'
const {Colors} = Styles;
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const MenuItem = require('material-ui/lib/menus/menu-item')
import {deleteDonation} from '../utility/api'

class DonationHistory extends Component {
  handleClick(index, fundId, donationId) {
    console.log(index)
    console.log(fundId)
    console.log(donationId)
    deleteDonation(this.props.deleteDonation, this.props.token, fundId, donationId)
  }

  render() {
    const donations = this.props.donations ? this.props.donations : []
    return (
      <List subheader="Donation History">
        {Object.keys(donations).map((donation, index) => {
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
            onItemTouchTap={this.handleClick.bind(this, index, this.props.fundId, donation)}
          >
            <MenuItem primaryText="Delete" />
          </IconMenu>
        );
          return (
            <div>
              <ListItem
                primaryText={donations[donation].name}
                key={index}
                secondaryText={
                  <p>
                    <span style={{color: Colors.darkBlack}}>Amount: ${donations[donation].amount}</span><br/>
                    {donations[donation].date}
                  </p>
                }
                rightIconButton={rightIconMenu}
                secondaryTextLines={2} 
                />
              <ListDivider />
            </div>                 
          )
        }
        )}
      </List>
    )
  }
}

DonationHistory.propTypes = {
  donations: PropTypes.array.isRequired
}

export default DonationHistory