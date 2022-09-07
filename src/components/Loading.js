import React, { Component } from 'react'

export class Loading extends Component {
  render() {
    return (
      <div className='text-center small'>
        {/* <img className='rounded my-4' src={video}  alt="vido!" /> */}
        <div className="spinner-border my-3"></div>

        {/* hi */}
      </div>
    )
  }
}

export default Loading; 
