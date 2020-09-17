import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import { withRouter, Link } from 'react-router-dom'

import './home-page.sass'

import { withDataService } from '../hoc'
import RealtyList from '../realty-list'
import RealtyFilters from '../realty-filters'
import PdfArticlesList from '../pdf-articles-list'
import ContactForm from '../contact-form'
import Spinner from '../spinner'

let formLabel = null

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      content: null,
      contactFormView: false
    }
    this.filters = this.props.match.params
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getMainPageData()
      .then((content) => {
        this.setState({ content })
      })
  }

  contactFormToggle () {
    this.setState({
      contactFormView: !this.state.contactFormView
    })
  }

  render () {
    const { content, contactFormView } = this.state

    let mainPageContent = null
    if (content) {
      const style = {
        backgroundImage: `url(${content.mainImage})`
      }
      let btn1 = null
      if (content.mainBtnActive1) {
        btn1 = (
          <button
            className='btn btn-green btn-md'
            onClick={() => {
              formLabel = content.mainBtn1
              this.contactFormToggle()
            }}
          >
            {content.mainBtn1}
          </button>
        )
      }
      let btn2 = null
      if (content.mainBtnActive2) {
        btn2 = (
          <Link
            className='btn btn-green btn-md'
            to='/для-продавца'
          >
            {content.mainBtn2}
          </Link>
        )
      }
      mainPageContent = (
        <div className='main-page'>
          { contactFormView ? <ContactForm formLabel={formLabel} contactFormToggle={() => this.contactFormToggle()} /> : null }
          <div
            className='main-page-banner'
            style={style}
          >
            <h1 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.mainTitle) }} />
            <div className='buttons'>
              {btn1}
              {btn2}
            </div>
          </div>
          <div className='main-page-realty'>
            <div className='realty-filters'>
              <div className='filters-block'>
                <RealtyFilters
                  history={this.props.history}
                />
              </div>
            </div>
            <div className='realty-list'>
              <RealtyList
                history={this.props.history}
                filters={this.props.match.params}
              />
            </div>
          </div>
          <div className='main-page-consultation'>
            <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.consultationTitle) }} />
            <button
              className='btn btn-green btn-md'
              onClick={() => {
                formLabel = 'Получить консультацию'
                this.contactFormToggle()
              }}
            >
              {content.consultationBtn}
            </button>
          </div>
          <div className='main-page-pdf'>
            <h4>Статьи</h4>
            <PdfArticlesList />
            <Link
              to='/статьи'
              className='btn btn-green btn-md'
            >
              Смотреть все статьи
            </Link>
          </div>
          <div className='main-page-sale'>
            <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.saleTitle) }} />
            <button
              className='btn btn-green btn-md'
              onClick={() => {
                formLabel = 'Оставить заявку на продажу'
                this.contactFormToggle()
              }}
            >
              {content.saleBtn}
            </button>
          </div>
        </div>
      )
    } else {
      return <div className='main-page loading'><Spinner /></div>
    }

    return (
      mainPageContent
    )
  }
}

export default withRouter(
  withDataService(HomePage)
)
