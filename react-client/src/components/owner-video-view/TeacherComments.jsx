import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import filestack from 'filestack-js';
import config from '../../../../config'

const apikey = 'A28J1LUkTB6r5Y2TZwcKoz';

class TeacherComments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.openPicker = this.openPicker.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
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
    var fsClient = filestack.init(config.FILESTACK_API);
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
      .then((response) => handleFileUpload(response))
      .catch((err) => console.log('ERROR IN FILE UPLOAD', err))
  }

  handleFileUpload(data) {

  }
}


export default TeacherComments;