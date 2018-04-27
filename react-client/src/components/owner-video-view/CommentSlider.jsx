import React from 'react';
import Slider, {Range} from 'rc-slider';

const style = {
  width: '600',
  margin: '50'
};

class CommentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      duration: this.props.video.duration
    }
  }

  onSliderChange = (value) => {
    console.log(value);
    this.setState({
      value: value
    })
  }


  render() {
    return(
      <div style={style}>
        <Range allowCross={false}  defaultValue={[0, 1]} min={0} max={this.state.duration} onChange={this.onSliderChange} />
      </div>
    )
  }
}


export default CommentSlider;


//<Slider value={this.state.value} onChange={this.onSliderChange} style={{width: '400', margin: '50'}}>Hello</Slider>