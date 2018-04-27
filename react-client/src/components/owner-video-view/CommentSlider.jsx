import React from 'react';
import Slider, {Range} from 'rc-slider';
import TeacherForm from './TeacherForm.jsx';

class CommentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 0
    }
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      start: value[0],
      end: value[1]
    })
  }


  render() {
    return(
      <div>
        <div style={{marginBottom: '10px', paddingTop: '10px'}}>Set time range:</div>
        <div style={style}>
          <Range allowCross={false} defaultValue={[0, 0]} min={0} max={this.props.video.duration} onChange={this.onSliderChange} />
        </div>
        <div>
          <TeacherForm save={this.props.save} video={this.props.video} start={this.state.start} end={this.state.end}/>
        </div>
      </div>
    )
  }
}

const style = {
  padding: '10px',
}


export default CommentSlider;


//<Slider value={this.state.value} onChange={this.onSliderChange} style={{width: '400', margin: '50'}}>Hello</Slider>