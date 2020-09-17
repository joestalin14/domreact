import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './app.sass'

import DataService from '../../services/data-service'
import AppHeader from '../app-header'
import { HomePage,
         BuyerPage,
         SalerPage,
         RealtyObjectPage,
         BlogPage,
         BlogArticlePage,
         PdfArticlesPage } from '../pages'
import AppFooter from '../app-footer'

const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      posts: null
    }
    this.dataService = new DataService()
  }

  componentDidMount () {
    this.dataService
      .getAllPosts()
      .then((posts) => {
        this.setState({ posts })
      })
  }

  render () {
    return (
      <div className='app'>
        <AppHeader />
        <Switch>
          <Route
            path={`/object/:id`}
            render={({match}) => {
              const { id } = match.params
              return <RealtyObjectPage itemId={id} />
            }}
            exact
          />
          <Route
            path={`/блог:id`}
            render={({match}) => {
              const { id } = match.params
              return <BlogArticlePage articleId={id} />
            }}
            exact
          />
          <Route
            path='/для-покупателя'
            component={BuyerPage}
            exact
          />
          <Route
            path='/для-продавца'
            component={SalerPage}
            exact
          />
          <Route
            path='/блог'
            component={BlogPage}
            exact
          />
          <Route
            path='/статьи'
            component={PdfArticlesPage}
            exact
          />
          <Route
            path='/:filters?'
            component={HomePage}
            exact
          />
          <Route path='*' component={NoMatchPage} />
        </Switch>
        <AppFooter />
      </div>
    )
  }
}

export default App
