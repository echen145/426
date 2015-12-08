import React, { PropTypes, Component } from 'react'
import { List, ListDivider, ListItem, Styles } from 'material-ui'

const { Colors } = Styles 

class DonationHistory extends Component {
  render() {
    const donations = this.props.donations ? this.props.donations : []
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