import React, {Component} from 'react'
import { SelectField, Toggle } from 'material-ui'

const arbitraryArrayMenuItems = [
  {id:1, name:'Option 1'},
  {id:2, name:'Option 2'},
  {id:3, name:'Option 3'},
  {id:4, name:'Option 4'},
  {id:5, name:'Option 5'},
]

const styles = {
  textfield: {
    marginLeft: 10,
    marginTop: 10,
  }
}

class Setting extends Component {
  constructor() {
    super()
    this.state = {
      selectValue1: 1,
      selectValue2: 1,
      selectValue3: 1,
    }
  }


  _handleSelectValueChange(name, e) {
    const change = {}
    change[name] = e.target.value
    this.setState(change);
  }

  _handleThemeToggle() {
    this.props.settingsActions.toggleTheme() 
  }

  render() {
    return (
      <div className="settings">
        <Toggle
          name="theme"
          value="toggleValue1"
          label="Theme" 
          onToggle={this._handleThemeToggle.bind(this)} />
        <br/>
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