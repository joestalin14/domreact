import React, { Component } from 'react'
import DOMPurify from 'dompurify'

import './blog-article-page.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class BlogArticlePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getPost(this.props.articleId)
      .then((data) => {
        this.setState({ data })
      })
  }

  render () {
    const { data } = this.state

    if (!data) {
      return <div className='blog-article-page loading'><Spinner /></div>
    }

    return (
      <div className='blog-article-page'>
        <div className='blog-article-page-inner'>
          <h1>{data.title}</h1>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content)}}
          />
        </div>
      </div>
    )
  }
}

export default withDataService(BlogArticlePage)
