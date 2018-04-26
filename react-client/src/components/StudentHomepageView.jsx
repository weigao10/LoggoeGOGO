import {withRouter} from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import VideoList from './student-homepage-view/VideoListView.jsx';
import Paper from 'material-ui/Paper';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

class StudentHomepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            videoList: [],
            teachers: []
        }
        this.sendToSelectedVideo = this.sendToSelectedVideo.bind(this);
        this.getTeachers = this.getTeachers.bind(this);
    }

    componentDidMount() {
        this.getTeachers();
        axios.get('/student/homepage')
            .then((response) => this.setState({videoList: response.data})); 
    }

    sendToSelectedVideo(videoId) {
        this.props.history.push({
            pathname: '/student/video',
            videoId: videoId,
            username: this.props.location.username
          })
    }

    getTeachers() {
      axios.get('/student/teachers')
      .then(({data}) => {
        console.log(data)
        this.setState({
          teachers: data
        })
      })
      .catch((err) => {
        console.log(err);
      })
    }

    render() {
        return (
            <Paper style={style} zDepth={1}>
                    <h6>You are logged in as {this.props.location.username}</h6>
                <div>
                    <Paper 
                        style={searchStyle} 
                        zDepth={1}>  
                        <div> 
                            <AutoComplete 
                                dataSource={[]} />
                            <RaisedButton 
                                label="Search" />
                        </div>
                    </Paper>
                    <br/>
                    <Paper style={searchStyle} zDepth={1}>
                    <select>
                    {this.state.teachers.length === 0 ? null : this.state.teachers.map((teacher) => {
                      return(
                        <option key={teacher.id}>{teacher.firstName}</option>
                      )
                    })}
                    </select>
                    </Paper>
                    <VideoList 
                        videos={this.state.videoList} 
                        redirect={this.sendToSelectedVideo}/>
                </div>
            </Paper>
          )
    }
}

const style = {
    height: '100%',
    width: '100%',
    margin: '30px',
    textAlign: 'center',
    display: 'block',
    padding: '30px',
    background: '#D8E4EA'
  }
  const searchStyle = {
    height: '100%',
    width: 'auto',
    margin: '20px',
    textAlign: 'center',
    display: 'inline-block',
    padding: '10px'
  }

export default withRouter(StudentHomepage);