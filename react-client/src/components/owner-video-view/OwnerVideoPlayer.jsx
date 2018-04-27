import React from 'react';
import axios from 'axios';

import RaisedButton from 'material-ui/RaisedButton';
import YouTube from 'react-youtube';
import Paper from 'material-ui/Paper';
import TeacherComments from './TeacherComments.jsx';
import CommentSlider from './CommentSlider.jsx';
import TeacherForm from './TeacherForm.jsx';
import Auth from '../../utils/auth.js';


class OwnerVideoPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      videoId: this.props.videoId,
      video: this.props.video,
      player: null,
      comments: [],
      showCommentForm: false
    };

    this.onReady = this.onReady.bind(this);
    this.onPlayVideo = this.onPlayVideo.bind(this);
    this.onPauseVideo = this.onPauseVideo.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.getComments = this.getComments.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
  }

  componentDidMount() {
    this.getComments();
    console.log(this.props.video)
  }

  onReady(event) {
    this.setState({
      player: event.target,
    });
  }
  
  onPlayVideo() {
    this.state.player.playVideo();
  }

  onPauseVideo() {
    this.state.player.pauseVideo();
  }

  saveComment(start, end, comment, callback) {
    axios.post('/owner/comment',
      {
        userId: Auth.userId,
        videoId: this.state.videoId,
        start: start,
        end: end,
        comment: comment
      }
    )
    .then(({data}) => {
      console.log(data)
      callback();
      this.getComments();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getComments() {
    axios.get('/owner/comment', {
      params: {
        videoId: this.state.videoId
      }
    })
    .then(({data}) => {
      this.setState({
        comments: data
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteComment(comment) {
    axios.delete('/owner/comment', {params: {comment: comment}})
    .then(() => {
      console.log('Successfully deleted comment');
      this.getComments();
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  render() {
    const opts = {
      height: '390',
      width: '500',
      playerVars: {
        autoplay: 0,
        start: this.props.startingTimestamp,
      }
    };

    return (
      <div>
        <div>
          <YouTube
            videoId={this.state.videoId}
            opts={opts}
            onReady={this.onReady}
          />
        </div>
        <div>
          <RaisedButton 
            style={{margin: '5px'}} 
            onClick={this.onPlayVideo}  
            label="Play"/>
          <RaisedButton 
            style={{margin: '5px'}} 
            onClick={this.onPauseVideo} 
            label="Pause"/>
          <RaisedButton 
            style={{margin: '5px'}} 
            label={this.state.showCommentForm ? 'Hide Form' : 'Add Comment'}
            onClick={() => {this.setState({showCommentForm: !this.state.showCommentForm})}}
            />
        </div>
        <br/>
        <CommentSlider video={this.state.video}/>
        <br/>
        <Paper>
          {this.state.showCommentForm ? <TeacherForm video={this.state.videoId} save={this.saveComment}/> : null}
        </Paper>
        <br/>
        <Paper>
          <TeacherComments comments={this.state.comments} deleteComment={this.deleteComment}/>
        </Paper>
      </div>
    );
  }
}


export default OwnerVideoPlayer;