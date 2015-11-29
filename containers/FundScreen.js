import React, { PropTypes, Component } from 'react'
import Tabs from 'material-ui/lib/tabs/tabs'
import Tab from 'material-ui/lib/tabs/tab'
import FundSummary from '../components/FundSummary'
import FundMap from '../components/FundMap'

export default class FundScreen extends Component {
  render() {
    const { fundId } = this.props.params
    const fund = this.props.fund[fundId]
    console.log(this.props)
    return (
      <Tabs>
        <Tab label="Summary" >
          <FundSummary fund={fund} />
        </Tab>
        <Tab label="Map" >
          <FundMap map={this.props.map} />
        </Tab>
        <Tab label="Edit" >
        </Tab >
      </Tabs>
    )
  }
}