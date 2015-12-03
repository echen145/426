import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import React, {Component, PropTypes} from 'react'

class FundList extends Component {
  constructor() {
    super()
  }

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
              key={index}
              onTouchTap={this.props.onClick.bind(this, index)} />
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
