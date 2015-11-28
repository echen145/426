import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import React, {Component} from 'react'

export default class FundList extends Component {
  render() {
    // console.log(this.props)
    return (
      <List subheader="Funds">
        {this.props.funds.map((fund, index) =>
          <div>
            <ListItem
              primaryText={fund.fundName}
              secondaryText={<p>Goal: ${fund.fundAmount}</p>}
              secondaryTextLines={1} 
              key={index} />
             <ListDivider />
          </div>
          )}
      </List>
    )
  }
}