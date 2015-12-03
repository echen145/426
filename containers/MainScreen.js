import React, { Component, PropTypes } from 'react'
import DirectionMap from '../components/DirectionMap'
import TextBox from '../components/TextBox'

class MainScreen extends Component {
  render() {
    let styles = {
      main: {
        marginLeft: 10,
        marginTop: 10
      }
    }
    return (
      <div className="container-fluid">
        <div className="row" style={styles.main} >
          <div className="col-sm-6"> 
            <DirectionMap map={this.props.map} />
          </div>
          <div className="col-sm-6">
            <TextBox 
              updatePath={() => this.props.updatePath('/funds')} 
              getDirection={this.props.mapActions.getDirection} 
              addFund={this.props.fundActions.addFund} />
          </div>
        </div>
      </div>
    )
  }
}

MainScreen.propTypes = {
  map: PropTypes.object.isRequired,
  mapAction: PropTypes.object.isRequired,
  fundActions: PropTypes.object.isRequired
}

export default MainScreen
