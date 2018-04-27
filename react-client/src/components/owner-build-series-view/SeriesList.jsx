import React from 'react';
import SeriesListEntry from './SeriesListEntry.jsx';
import Paper from 'material-ui/Paper';
import { ItemTypes } from '../../constants.js';
import { DropTarget } from 'react-dnd';

const videoSource = {
  // NEED TO UPDATE
  drop(props, monitor) {
    let item = monitor.getItem();
    props.addToSeries(item.item);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class SeriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seriesDropDown: null,
      seriesInput: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({ seriesInput: evt.target.value })
  }

  render() {
    // NEED TO UPDATE
    const { userId, username, videosInSeries, videos, removeFromSeries, addToSeries, redirect, saveSeries, connectDropTarget} = this.props;
    
    // render input element if VideoSeriesList is not empty
    const conditionalInput = videosInSeries.length === 0 ?
      <div></div> :
      <input style={add10pxBottom} type="text" value={this.state.seriesInput} onChange={this.handleChange} />;

    // render save button if VideoSeriesList is not empty
    const conditionalSaveBtn = videosInSeries.length === 0 ?
      <div></div> :
      <button style={add10pxBottom} onClick={() => {saveSeries(videosInSeries, userId, username)}}>Save Series</button>;


    return connectDropTarget(
      <div style={container}>
        <Paper style={style}>
          <div>
            {videosInSeries.length === 0 ? 'Search for a video and drag it here to save it' : <div style={add10pxBottom} >Videos in series: {videosInSeries.length}</div> }
            Series Title: {conditionalInput}<br/>
            {conditionalSaveBtn}
            {videosInSeries.length === 0 ? null :
              videosInSeries.map((video) => {
                return (
                  <SeriesListEntry key={video.videoId} video={video} redirect={redirect} removeFromSeries={removeFromSeries}/>
                );
              })}
          </div>
        </Paper>
      </div>
    )
  }
}

const style = {
  height: '100%',
  width: 'auto',
  margin: '30px',
  textAlign: 'center',
  display: 'block',
  padding: '30px 5px',
  "overflowY": 'auto',
}

const container = {
  height: '70vh',
  float: 'right',
  width: '40%',
}

const add10pxBottom = {
  marginBottom: '10px'
}

export default DropTarget(ItemTypes.VIDEO, videoSource, collect)(SeriesList);