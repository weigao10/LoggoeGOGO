import React from 'react';
import Paper from 'material-ui/Paper';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants.js';

const SearchListEntry = ({video, save, redirect}) => (
  <Paper style={style}>
    <div style={{display: 'inline-block'}}>
      <div style={{width: '30%', float: 'left'}}>
        <img className="media-object" 
          src={video.snippet.thumbnails.default.url} 
          alt="" />
      </div>
      <div style={{width: '50%', float: 'right'}}>
        <div style={{fontWeight: 'bold'}}> {video.snippet.title} </div>
        <br/>
        <div style={{color: 'grey'}}> {video.snippet.description} </div>
        <br/>
        <button onClick={() => {save(video)}}>Save to Videos</button>
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

export default SearchListEntry;