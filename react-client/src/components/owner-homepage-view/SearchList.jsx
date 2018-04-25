import React from 'react';
import Paper from 'material-ui/Paper';
import SearchListEntry from './SearchListEntry.jsx';

const SearchList = ({videos, redirect, save}) => (
  <div>
    <Paper style={style}>
      <div>
        {videos.map((video, i) => <SearchListEntry key={i} video={video} redirect={redirect} save={save}/>)}
      </div>
    </Paper>
  </div>
)

const style = {
  height: 'auto',
  width: 'auto',
  margin: '30px',
  textAlign: 'center',
  display: 'block',
  padding: '30px 5px',
  float: 'left',
  width: '40%'
}


export default SearchList;