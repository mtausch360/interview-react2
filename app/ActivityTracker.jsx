import React, { Component } from 'react'
import { connect } from 'react-redux'

 class ActivityTracker extends Component {

  render () {
    return (
      <div>
        Hello ActivityTracker
      </div>
    )
  }
}

function mapStateToProps () {
  return {}
}

export default connect(mapStateToProps)(ActivityTracker)
