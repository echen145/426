import TextField from 'material-ui/lib/text-field'
import {default as React, Component} from "react";

export default class TextBox extends Component {
  render() {
    return (
      <div className="textbox">
        <TextField
          floatingLabelText="Starting Location"
          multiLine={true} 
        />
        <TextField
          floatingLabelText="Destination"
          multiLine={true} 
        />
    </div>
    )
  }
}