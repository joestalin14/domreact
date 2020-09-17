import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './app-footer.sass'

import { withDataService } from '../hoc'
import Spinner from '../spinner'

class AppFooter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount () {
    this.props.dataService
    .getFooterSidebarData()
    .then((data) => {
      this.setState({ data })
    })
  }

  render () {
    const { data } = this.state

    if (!data) {
      return <div className='app-footer loading'><Spinner /></div>
    }

    return (
      <footer className='app-footer'>
        <div className='footer-column'>
          <p className='column-header'>Поселки</p>
          <div className='column-list'>
            <a href='http://dom.feblog.ru/village=Чертовицы&'>Чертовицы</a>
            <a href='http://dom.feblog.ru/village=Отрадное&'>Отрадное</a>
            <a href='http://dom.feblog.ru/village=Медовка&'>Медовка</a>
          </div>
        </div>
        <div className='footer-column'>
          <p className='column-header'>Подборки</p>
          <div className='column-list'>
            <a href='http://dom.feblog.ru/attributes=Ландшафтный дизайн на участке&'>Ландшафтный дизайн на участке</a>
            <a href='http://dom.feblog.ru/attributes=У воды&'>У воды</a>
            <a href='http://dom.feblog.ru/attributes=У леса&'>У леса</a>
            <a href='http://dom.feblog.ru/attributes=Детский сад рядом&'>Детский сад рядом</a>
            <a href='http://dom.feblog.ru/attributes=Бассейн на участке&'>Бассейн на участке</a>
          </div>
        </div>
        <div
          className='footer-column'
          dangerouslySetInnerHTML={{ __html: data.data}}
        />
      </footer>
    )
  }
}

export default withRouter(withDataService(AppFooter))
