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
          fund={this.props.fund}
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