import List from 'material-ui/lib/lists/list'
import ListDivider from 'material-ui/lib/lists/list-divider'
import ListItem from 'material-ui/lib/lists/list-item'
import React, {Component, PropTypes} from 'react'

class FundList extends Component {
  constructor() {
    super()
  }

  _onClick(index) {
    this.props.updatePath('/fund/'+index)
  } 

  render() {
    // console.log(this.props)
    return (
      <List subheader="Funds">
        {this.props.fund.map((fund, index) =>
          <div>
            <ListItem
              primaryText={fund.fundName}
              secondaryText={<p>Goal: ${fund.fundAmount}</p>}
              secondaryTextLines={1} 
              key={index}
              onTouchTap={this._onClick.bind(this, index)} />
             <ListDivider />
          </div>
          )}
      </List>
    )
  }
}

FundList.propTypes = {
  fund: PropTypes.array.isRequired,
  updatePath: PropTypes.func.isRequired
}

export default FundList
