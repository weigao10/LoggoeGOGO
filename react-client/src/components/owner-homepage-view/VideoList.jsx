import React from 'react';
import VideoListEntry from './VideoListEntry.jsx';
import Paper from 'material-ui/Paper';
import { ItemTypes } from '../../constants.js';
import { DropTarget } from 'react-dnd';

const videoSource = {
  drop(props, monitor) {
    let item = monitor.getItem();
    props.save(item.item);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}


class VideoList extends React.Component {

  render() {
    const { videos, redirect, deleteVideo, connectDropTarget} = this.props;
    return connectDropTarget(
      <div>
        <Paper style={style}>
          <div>
            {videos.map((video, i) => <VideoListEntry key={i} video={video} redirect={redirect} deleteVideo={deleteVideo}/>)}
          </div>
        </Paper>
      </div>
    )
  }
}


const style = {
  height: 'auto',
  width: 'auto',
  margin: '30px',
  textAlign: 'center',
  display: 'block',
  padding: '30px 5px'
}

export default DropTarget(ItemTypes.VIDEO, videoSource, collect)(VideoList);