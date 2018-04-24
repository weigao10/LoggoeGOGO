import React from 'react';
import Paper from 'material-ui/Paper';

const VideoListEntry = ({video, redirect}) => (
  <Paper style={style} key={video.id}>
    <div key={video.id} onClick={()=>{redirect(video)}} style={{display: 'inline-block'}}>
      <div style={{width: '30%', float: 'left'}}>
        <img className="media-object" 
          src={video.image} 
          alt="" />
      </div>
      <div style={{width: '50%', float: 'right'}}>
        <div style={{fontWeight: 'bold'}}> {video.title} </div>
        <br/>
        <div style={{color: 'grey'}}> {video.description} </div>
      </div>
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

export default VideoListEntry;
