import React from 'react';
import VideoListEntry from './VideoListEntry.jsx';
import Paper from 'material-ui/Paper';

const VideoList = ({videos, redirect, deleteVideo}) => (
    <Paper style={style}>
      <div>
        {videos.map((video, i) => <VideoListEntry key={i} video={video} redirect={redirect} deleteVideo={deleteVideo}/>)}
      </div>
    </Paper>
)

const style = {
  height: 'auto',
  width: 'auto',
  margin: '30px',
  textAlign: 'center',
  display: 'block',
  padding: '30px 5px'
}

export default VideoList