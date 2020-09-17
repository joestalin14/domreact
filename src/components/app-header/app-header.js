import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import './app-header.sass'

import { withDataService } from '../hoc'
import ContactForm from '../contact-form'
import Spinner from '../spinner'

class AppHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logo: null,
      navData: null,
      navOpened: false,
      widgetData: null,
      contactFormView: false,
      headerPhone: null
    }
  }

  componentDidMount () {
    this.props.dataService
      .getMainNav()
      .then((navData) => {
        this.setState({ navData })
      })
    this.props.dataService
      .getLogo()
      .then((logo) => {
        this.setState({ logo })
      })
    this.props.dataService
      .getMenuSidebarData()
      .then((widgetData) => {
        this.setState({ widgetData })
      })
    this.props.dataService
      .getHeaderSidebarData()
      .then((headerPhone) => {
        this.setState({ headerPhone })
      })
  }

  onNavToggle () {
    this.setState({
      navOpened: !this.state.navOpened
    })
  }

  contactFormToggle () {
    this.setState({
      contactFormView: !this.state.contactFormView
    })
  }

  render () {
    const { logo,
            navData,
            navOpened,
            widgetData,
            contactFormView,
            headerPhone } = this.state

    if (!logo || !widgetData || !headerPhone) {
      return <nav className='app-header loading'><Spinner /></nav>
    }

    let siteLogo = null
    if (logo) {
      siteLogo = <img src={logo.url} alt='logo' />
    }

    let siteNav = null
    if (navData) {
      siteNav = navData.map((navItem) => {
        return (
          <li
            className='list-item'
            key={navItem.id}
          >
            <Link
              className='list-item-link'
              to={navItem.url}
              onClick={() => this.onNavToggle()}
            >
              {navItem.label}
            </Link>
          </li>
        )
      })
    }

    let widget = null
    if (widgetData) {
      widget = (
        <div
          dangerouslySetInnerHTML={{ __html: widgetData.data}}
        />
      )
    }

    let navClassName = 'main-nav'
    if (navOpened) {
      navClassName = 'main-nav opened'
    }

    return (
      <Fragment>
        { contactFormView ? <ContactForm formLabel='Заказать звонок' contactFormToggle={() => this.contactFormToggle()} /> : null }
        <nav className='app-header'>
          <div className='app-header-col logo'>
            <a className='app-header-brand' href='/'>
              {siteLogo}
            </a>
          </div>
          <div className='app-header-col nav-btn'>
            <button
              className='open-nav-btn'
              onClick={() => this.onNavToggle()}
            >
              <span className='nav-items'>
                <span className='nav-item' />
                <span className='nav-item' />
              </span>
              <span className='nav-text'>Меню</span>
            </button>
          </div>
          <div
            className='app-header-col phone-number'
            dangerouslySetInnerHTML={{ __html: headerPhone.data}}
          />
          <div className='app-header-col call-btn'>
            <button className='btn btn-green btn-md' onClick={() => this.contactFormToggle()}>Заказать звонок</button>
          </div>
        </nav>
        <div className={navClassName}>
          <button
            className='main-nav-close'
            onClick={() => this.onNavToggle()}
          >
            <i className='fas fa-times' />
          </button>
          <ul className='app-header-list'>
            {siteNav}
          </ul>
          {widget}
        </div>
      </Fragment>
    )
  }
}

export default withDataService(AppHeader)
