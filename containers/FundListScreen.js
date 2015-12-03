import React, { PropTypes, Component } from 'react'
import FundList from '../components/FundList'

class FundListScreen extends Component {
  render() {
    return (
      <div>
        <FundList 
          onClick={(index) => 
            this.props.updatePath('/fund/' + index)
          }
          funds={this.props.funds}
        />
      </div>
    )
  }
}

FundListScreen.propTypes = {
  updatePath: PropTypes.func.isRequired,
  fund: PropTypes.object.isRequired
}

export default FundListScreen