import React, { Component } from 'react'

import './feedbacks.sass'

import { withDataService } from '../hoc'

class Feedbacks extends Component {
  constructor (props) {
    super(props)
    this.state = {
      feedbacks: null
    }
  }

  componentDidMount () {
    this.props.dataService
      .getAllFeedbacks()
      .then((feedbacks) => {
        this.setState({ feedbacks })
      })
  }

  render () {
    const { feedbacks } = this.state

    let feedbacksUI = null
    if (feedbacks) {
      feedbacksUI = feedbacks.map(({ id, img, text, author, agent }) => {
        return (
          <div className='feedback-card' key={id}>
            <img src={img} alt='feedback' />
            <p>{ agent }</p>
            <p>{ text }</p>
            <p>{ author }</p>
          </div>
        )
      })
    }

    return (
      <div className='feedbacks'>
        { feedbacksUI }
      </div>
    )
  }
}

export default withDataService(Feedbacks)
