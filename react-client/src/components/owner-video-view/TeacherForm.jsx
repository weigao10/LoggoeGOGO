import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

class TeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: '',
      end: '',
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleClick() {
    this.props.save(this.state.start, this.state.end, this.state.comment, () => {
      this.setState({
        start: '',
        end: '',
        comment: ''
      })
    });
  }

  render() {
    return(
      <Paper>
        Start Time: <input name="start" id="start" value={this.state.start} onChange={this.handleChange}></input>
        <br/>
        End Time: <input name="end" id="end" value={this.state.end} onChange={this.handleChange}></input>
        <br/>
        Comment: <input name="comment" id="comment" value={this.state.comment} onChange={this.handleChange}></input>
        <br/>
        <RaisedButton 
          style={{margin: '5px'}} 
          onClick={this.handleClick}
          label="Add"/>
      </Paper>
    )
  }
}


export default TeacherForm;