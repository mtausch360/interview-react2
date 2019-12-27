import React, { Component } from 'react'

const elStyle = {
  display: "inline-block"
}

export default class Activity extends Component {
  getDuration (startTime, endTime) {
    const date = new Date(endTime - startTime)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const seconds = date.getUTCSeconds()
    const f = (x) => x < 10 ? '0' + x: x 
    return `${f(hours)}:${f(minutes)}:${f(seconds)}`
  }
  render () {
    const { id, startTime, endTime, description } = this.props.activity

    const isRunning = endTime === null
    const duration = isRunning ? this.getDuration(startTime, new Date()): this.getDuration(startTime, endTime)
    return (
      <div>
        <div style={elStyle}>
          <div>Start Time</div>
          <div>{startTime.toLocaleString()}</div>
        </div>
        {
          !isRunning && (
            <div style={elStyle}>
              <div>End Time</div>
              <div> {endTime.toLocaleString()}</div>
            </div>
          )
        }
        

        <div style={elStyle}>
          <div>Duration</div>
          <div>{duration}</div>
        </div>

        <div style={elStyle}>
          <div>Description</div>
          <div>{description}</div>
        </div>

        {
          isRunning &&
            <div>
              <input type="submit" value="Stop Activity" onClick={this.props.endActivity}/>
            </div>
        }
        
      </div>
    )
  }
}
