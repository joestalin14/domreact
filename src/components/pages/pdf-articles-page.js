import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './pdf-articles-page.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class PdfArticlesPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getPdfArticlesData()
      .then((data) => {
        this.setState({ data })
      })
  }

  render () {
    const { data } = this.state

    if (!data) {
      return (
        <div className='pdf-articles-page loading'>
          <Spinner />
        </div>
      )
    }

    const articles = data.map((dataItem) => {
      const style = {
        backgroundImage: `url(${dataItem.img})`
      }
      return (
        <div
          className='pdf-article-item'
          style={style}
          key={dataItem.id}
        >
          <div className='item-bg'>
            <p>{dataItem.title}</p>
            <p className='link'>
              <a
                href={dataItem.link}
                target='_blank'
                rel='noopener noreferrer'
              >
                Читать статью
              </a>
            </p>
            <p className='link'>
              <Link
                to={dataItem.link.slice(22)}
                target='_blank'
                rel='noopener noreferrer'
                download
              >
                Скачать статью
              </Link>
            </p>
          </div>
        </div>
      )
    })

    return (
      <div className='pdf-articles-page'>
        <div className='pdf-articles-page-inner'>
          <h1>Статьи</h1>
          <div className='items'>
            {articles}
          </div>
        </div>
      </div>
    )
  }

}

export default withDataService(PdfArticlesPage)
