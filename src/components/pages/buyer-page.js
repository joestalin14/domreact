import React, { Component } from 'react'
import DOMPurify from 'dompurify'

import './buyer-page.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class BuyerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getBuyerPageData()
      .then((data) => {
        this.setState({ data })
      })
  }

  render () {
    const { data } = this.state

    let pageInner = null
    if (data) {
      const { title, content } = data
      pageInner = (
        <div className='buyer-page-inner'>
          <h1>{title}</h1>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      )
    } else {
      return <div className='buyer-page loading'><Spinner /></div>
    }

    return (
      <div className='buyer-page'>
        {pageInner}
      </div>
    )
  }
}

export default withDataService(BuyerPage)
