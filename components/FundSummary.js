import React, { PropTypes, Component } from 'react'
import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'

class FundSummary extends Component {
  render() {
    return (
      <div>
        <List subheader="Summary">
          <ListItem
            primaryText="Fund Name"
            secondaryText={<p>{this.props.fund.fundName}</p>}
            secondaryTextLines={1}
            disabled={true} />
           <ListDivider />
           <ListItem
            primaryText="Fund Goal"
            secondaryText={<p>${this.props.fund.fundAmount}</p>}
            secondaryTextLines={1} 
            disabled={true} />
           <ListDivider />
           <ListItem
            primaryText="Amount Raised"
            secondaryText={<p>${this.props.fund.fundRaised}</p>}
            secondaryTextLines={1} 
            disabled={true} />
           <ListDivider />
        </List>
      </div>
    )
  }
}

FundSummary.propTypes = {
  fund: PropTypes.object.isRequired
}

export default FundSummary
