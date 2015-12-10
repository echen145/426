import React, {Component} from 'react'
import { Toggle } from 'material-ui'

class Setting extends Component {
  constructor() {
    super()
  }

  getStyles() {
    return {
      container: {
        textAlign: 'left',
        marginBottom: '16px',
        minHeight: '24px',
        marginLeft: 10,
        marginTop: 30
      },
      group: {
        width: 250,
      },
      textfield: {
        marginLeft: 10,
        marginTop: 10,
      }
    };
  }  

  _handleThemeToggle() {
    this.props.settingsActions.toggleTheme(this.props.settings.isLight) 
  }

  render() {
    let styles = this.getStyles()
    return (
      <div className="settings" style={styles.group} >
        <div style={styles.container}>
          <Toggle
            name="theme"
            value="toggleValue1"
            label="Theme" 
            onToggle={this._handleThemeToggle.bind(this)} />
        </div>
      </div>
    )
  }
}

export default Setting;