import React, { Component } from 'react'

import { connect } from 'react-redux'

import Activity from './Activity.jsx'

const elStyle = {
  display: "inline-block"
}
class ActivityTracker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: 1,
      description: '',
      startTime: new Date()
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.endActivity = this.endActivity.bind(this)
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick () {
    this.setState({
      startTime: new Date()
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  handleChange (event) {
    this.setState({ description: event.target.value})
  }

  handleSubmit (event) {
    const { id, description, startTime } = this.state
    this.props.dispatch({
      type: "START_ACTIVITY",
      id,
      description,
      startTime
    })
    this.setState({
      id: id + 1,
      description: ""
    })
    event.preventDefault()
  }
  
  endActivity (id) {
    this.props.dispatch({
      type: "END_ACTIVITY",
      id,
      endTime: new Date()
    })
  }

  render () {
    const { description, startTime } = this.state
    const { activities } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div >
            <div style={elStyle}>
              <div>Start Time</div>
              <div>{ startTime.toLocaleString() }</div>
            </div>

            <div style={elStyle}>
              <div>Description</div>
              <div>
                <textarea
                  value={ description }
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div style={elStyle}>
              <input 
                type="submit"
                value="Start Activity"
              />
            </div>
          </div>
        </form>
        {
          activities.map((activity) => {
            return (
              <Activity
                key= {activity.id}
                activity={activity}
                endActivity = { () => this.endActivity(activity.id) }
              />
            )
          })
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  const { activities } = state
  return {
    activities
  }
}

export default connect(mapStateToProps)(ActivityTracker)
