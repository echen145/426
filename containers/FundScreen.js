import React, { PropTypes, Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import FundSummary from '../components/FundSummary'
import FundMap from '../components/FundMap'

class FundScreen extends Component {
  render() {
    const { fundId } = this.props.params
    const fund = this.props.funds[fundId]
    const map = this.props.map
    return (
      <Tabs>
        <Tab label="Summary" >
          <FundSummary fund={fund} />
        </Tab>
        <Tab label="Map" >
          <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
            </div>
            <div className="col-sm-8">
              <FundMap map={map} />   
            </div>
            <div className="col-sm-2">
            </div>
          </div>
          </div>
        </Tab>
        <Tab label="Edit" >
        </Tab >
      </Tabs>
    )
  }
}

FundScreen.propTypes = {
  fund: PropTypes.object.isRequired,
  map: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired
}

export default FundScreen
