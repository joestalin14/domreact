import React, { Component } from 'react'
import DOMPurify from 'dompurify'

import './saler-page.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class SalerPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getSalerPageData()
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
        <div className='saler-page-inner'>
          <h1>{title}</h1>
          <div
            className='content'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      )
    } else {
      return <div className='saler-page loading'><Spinner /></div>
    }

    return (
      <div className='saler-page'>
        {pageInner}
      </div>
    )
  }
}

export default withDataService(SalerPage)
