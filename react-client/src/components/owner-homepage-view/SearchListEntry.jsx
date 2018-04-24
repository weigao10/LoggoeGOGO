import React from 'react';
import Paper from 'material-ui/Paper';


const SearchListEntry = ({video}) => (
  <Paper>
    <div onClick={()=>{redirect(video)}} style={{display: 'inline-block'}}>
      <div style={{width: '30%', float: 'left'}}>
        <img className="media-object" 
          src={video.snippet.thumbnails.default.url} 
          alt="" />
      </div>
      <div style={{width: '50%', float: 'right'}}>
        <div style={{fontWeight: 'bold'}}> {video.snippet.title} </div>
        <br/>
        <div style={{color: 'grey'}}> {video.snippet.description} </div>
      </div>
    </div>
  </Paper>
)

export default SearchListEntry;