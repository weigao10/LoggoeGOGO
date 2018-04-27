import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import AutoComplete from 'material-ui/AutoComplete';
import moment from 'moment';

class TeacherForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(comment) {
    this.setState({
      comment: comment
    })
  }

  handleClick() {
    let start = this.props.start >= 3600 ? moment.utc(this.props.start*1000).format('HH:mm:ss') : moment.utc(this.props.start*1000).format('mm:ss');
    let end = this.props.end >= 3600 ? moment.utc(this.props.end*1000).format('HH:mm:ss') : moment.utc(this.props.end*1000).format('mm:ss');
    this.props.save(start, end, this.state.comment, () => {
      this.setState({
        comment: ''
      })
    });
  }

  render() {
    return(
      <div>
        <AutoComplete dataSource={[]} 
          refs={"autocomplete"} 
          searchText={this.state.comment}
          onUpdateInput={this.handleChange}
        />
        <br/>
        <RaisedButton 
          style={{margin: '5px'}} 
          onClick={this.handleClick}
          label="Add"/>
      </div>
    )
  }
}


export default TeacherForm;


/* 
             Comment: <input name="comment" id="comment" value={this.state.comment} onChange={this.handleChange}></input> */