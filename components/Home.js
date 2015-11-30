import React, {Component} from 'react'
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

export default Home;