import React, { Component } from 'react'
import video from './/Spinner.gif'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={video}  alt="vido!"/>
        {/* hi */}
      </div>
    )
  }
}

export default Loading; 
