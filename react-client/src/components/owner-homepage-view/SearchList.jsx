import React from 'react';
import Paper from 'material-ui/Paper';
import SearchListEntry from './SearchListEntry.jsx';

const SearchList = ({videos, redirect, save, videosInSeries, selectedSeries}) => {
  console.log('videos: ', videosInSeries);

  

  if (selectedSeries === null) {
    return (
      <div style={container}>
        <Paper style={style}>
          <div>
            {videos.map((video, i) => <SearchListEntry key={i} video={video} redirect={redirect} save={save}/>)}
          </div>
        </Paper>
      </div>
    )
  } else {
    var totalDuration = 0;

    for (var item of videosInSeries) {
      totalDuration += item.duration;
    }

    return (
      <div style={container}>
        <Paper style={styleTextLeft}>
          <h2>Series Information:</h2>
          <h5><i>Series name:</i> {selectedSeries} </h5>
          <h5><i>Series length:</i> {videosInSeries.length} </h5>
          <h5><i>Average video duration:</i> {totalDuration / videosInSeries.length}</h5>
          <h5><i>Total series length:</i> {totalDuration}</h5>
        </Paper>
      </div>
    );
  }

}

const style = {
  height: '100%',
  width: 'auto',
  margin: '30px',
  textAlign: 'center',
  display: 'block',
  padding: '30px 5px',
  "overflowY": 'auto'
};

const styleTextLeft = {
  height: '100%',
  width: 'auto',
  margin: '30px',
  textAlign: 'left',
  display: 'block',
  padding: '30px 5px 0 15px',
  "overflowY": 'auto',
};

const container = {
  height: '70vh',
  float: 'left',
  width: '40%'
};

export default SearchList;