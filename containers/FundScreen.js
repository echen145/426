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
    const funds = this.props.funds
    const hashId = Object.keys(funds)[fundId]    
    const fund = funds[hashId]
    const map = fund.map
    const { addToFund, deleteDonation } = this.props.fundActions
    const donations = fund.donations
    const fundAmount = fund.fundRaised
    return (
      <Tabs>
        <Tab label="Summary" >
          <FundSummary fund={fund} />
        </Tab>
        <Tab label="History" >
          <DonationHistory 
            donations={donations}
            fundId={hashId}
            fundAmount={fundAmount}
            deleteDonation={deleteDonation}
            token={this.props.login.idToken.idToken}
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
            fund={fund}
            fundId={hashId}
            addToFund = {addToFund}
            token={this.props.login.idToken.idToken}
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
