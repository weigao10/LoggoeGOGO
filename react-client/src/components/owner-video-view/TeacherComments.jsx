import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import filestack from 'filestack-js';

const apikey = 'A28J1LUkTB6r5Y2TZwcKoz';

class TeacherComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.openPicker = this.openPicker.bind(this);
  }

  componentDidMount() {}

  render() {
    return (
      <Paper>
        <RaisedButton 
          label="Upload File"
          onClick={this.openPicker} />
      </Paper>
    );
  }

  openPicker() {
    var fsClient = filestack.init("A28J1LUkTB6r5Y2TZwcKoz");
    fsClient
      .pick({
        fromSources: [
          "local_file_system",
          "imagesearch",
          "googledrive",
          "dropbox",
          "evernote",
          "github"
        ]
      })
      .then(function(response) {
        // declare this function to handle response
        // handleFilestack(response);
        console.log("heyyyyyy");
      });
  }
}


export default TeacherComments;