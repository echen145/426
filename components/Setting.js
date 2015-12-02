import React, {Component} from 'react'
import { SelectField, Toggle } from 'material-ui'

const arbitraryArrayMenuItems = [
  {id:1, name:'Option 1'},
  {id:2, name:'Option 2'},
  {id:3, name:'Option 3'},
  {id:4, name:'Option 4'},
  {id:5, name:'Option 5'},
]


class Setting extends Component {
  constructor() {
    super()
    this.state = {
      selectValue1: 1,
      selectValue2: 1,
      selectValue3: 1,
    }
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

  _handleSelectValueChange(name, e) {
    const change = {}
    change[name] = e.target.value
    this.setState(change);
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
        <SelectField
          floatingLabelText="Setting 2"
          style={styles.textfield}
          value={this.state.selectValue2}
          valueMember="id"
          displayMember="name"
          onChange={this._handleSelectValueChange.bind(this, 'selectValue2')}
          menuItems={arbitraryArrayMenuItems} />
        <br/>
        <SelectField
          floatingLabelText="Setting 3"
          style={styles.textfield}
          value={this.state.selectValue3}
          valueMember="id"
          displayMember="name"
          onChange={this._handleSelectValueChange.bind(this, 'selectValue3')}
          menuItems={arbitraryArrayMenuItems} />
        <br/>
      </div>
    )
  }
}

export default Setting;