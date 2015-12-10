import React, { PropTypes, Component } from 'react'
import { List, ListDivider, ListItem, IconButton, IconMenu, Styles } from 'material-ui'
const {Colors} = Styles;
const MoreVertIcon = require('material-ui/lib/svg-icons/navigation/more-vert');
const MenuItem = require('material-ui/lib/menus/menu-item')


class DonationHistory extends Component {
  render() {
    const donations = this.props.donations ? this.props.donations : []
    let iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left">
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    let rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem primaryText="Delete" />
      </IconMenu>
    );
    return (
      <List subheader="Donation History">
        {Object.keys(donations).map((donation, index) =>
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
        )}
      </List>
    )
  }
}

DonationHistory.propTypes = {
  donations: PropTypes.array.isRequired
}

export default DonationHistory