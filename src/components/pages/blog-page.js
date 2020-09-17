import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'

import './blog-page.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class BlogPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getAllPosts()
      .then((data) => {
        this.setState({ data })
      })
  }

  render () {
    const { data } = this.state

    if (!data) {
      return <div className='blog-page loading'><Spinner /></div>
    }

    const articles = data.map(({ id, title, excerpt }) => {
      return (
        <div
          className='article-card'
          key={id}
        >
          <h4>{title}</h4>
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(excerpt)}}
          />
          <Link
            className='article-link'
            to={`/блог:${id}`}
          >
            Читать далее <i className='fas fa-caret-right' />
          </Link>
        </div>
      )
    })

    return (
      <div className='blog-page'>
        <div className='blog-page-inner'>
          {articles}
        </div>
      </div>
    )
  }
}

export default withDataService(BlogPage)
