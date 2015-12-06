import React, { PropTypes, Component } from 'react'
import { List, ListDivider, ListItem, Styles } from 'material-ui'

const { Colors } = Styles 

class DonationHistory extends Component {
  render() {
    return (
      <List subheader="Donation History">
        {this.props.donations.map((donation, index) =>
          <div>
            <ListItem
              primaryText={donation.name}
              key={index}
              secondaryText={
                <p>
                  <span style={{color: Colors.darkBlack}}>Amount: ${donation.amount}</span><br/>
                  {donation.date.toString()}
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