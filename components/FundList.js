import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import React, {Component, PropTypes} from 'react'

class FundList extends Component {
  constructor() {
    super()
  }

  render() {
    const funds = this.props.funds
    console.log(funds)
    return (
      <List subheader="Funds">
        {Object.keys(funds).map((fund, index) =>
          <div>
            <ListItem
              primaryText={funds[fund].fundName}
              secondaryText={<p>Goal: ${funds[fund].fundAmount}</p>}
              secondaryTextLines={1} 
              key={index}
              onTouchTap={this.props.onClick.bind(this, fund)} />
             <ListDivider />
          </div>
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
