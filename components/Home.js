import React, {Component, PropTypes} from 'react'
import { RaisedButton } from 'material-ui'

class Home extends Component {
  showLock() {
    this.props.lock.show()
  }


  render() {
    return (
      <div className="login-box" >
        <RaisedButton 
          label="Sign In"
          secondary={true} 
          onTouchTap={this.showLock.bind(this)} />
      </div>
    )
  }
}

Home.propTypes = {
  lock: PropTypes.object.isRequired
}


export default Home;