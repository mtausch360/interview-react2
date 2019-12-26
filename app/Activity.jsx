import React, { Component } from 'react'
import { connect } from 'react-redux'

class Activity extends Component {
  render () {
    return (
      <div>Activity</div>
    )
  }
}

const mapStateToProps = () => {
  return {}
}

export default connect(mapStateToProps)(Activity)
