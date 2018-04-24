import React from 'react';
import Paper from 'material-ui/Paper';
import SearchListEntry from './SearchListEntry.jsx';

const SearchList = ({videos, redirect}) => (
  <Paper>
    <div>
      {videos.map((video, i) => <SearchListEntry key={i} video={video} redirect={redirect}/>)}
    </div>
  </Paper>
)


export default SearchList;