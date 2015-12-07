import React, { PropTypes, Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import FundSummary from '../components/FundSummary'
import FundMap from '../components/FundMap'
import FundEditor from '../components/FundEditor'
import DonationHistory from '../components/DonationHistory'

class FundScreen extends Component {
  render() {
    const { fundId } = this.props.params
    const fund = this.props.funds[fundId]
    const map = fund.map
    const { addToFund } = this.props.fundActions
    const donations = fund.donations
    return (
      <Tabs>
        <Tab label="Summary" >
          <FundSummary fund={fund} />
        </Tab>
        <Tab label="History" >
          <DonationHistory 
            donations={donations}
          />
        </Tab>
        <Tab label="Map" >
          <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <FundMap 
                map={map} 
                fund={fund}
                />   
            </div>

          </div>
          </div>
        </Tab>
        <Tab label="Edit" >
          <FundEditor 
            addToFund = {(amount) => 
              addToFund(fundId, amount)
            }
          />
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
