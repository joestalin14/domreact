import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './pdf-articles-list.sass'

import { withDataService } from '../hoc'

class PdfArticlesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    this.props.dataService
      .getPdfArticlesData()
      .then((data) => {
        const newData = [ ...data.slice(0, 4) ]
        this.setState({ data: newData })
      })
  }

  render () {
    const { data } = this.state

    let articles = null
    if (data) {
      articles = data.map((dataItem) => {
        const style = {
          backgroundImage: `url(${dataItem.img})`
        }
        return (
          <div className='pdf-article-item' style={style} key={dataItem.id}>
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
    }

    return (
      <div className='pdf-articles-list'>
        {articles}
      </div>
    )
  }
}

export default withDataService(PdfArticlesList)
