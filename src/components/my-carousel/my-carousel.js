import React, { Component } from 'react'

import './my-carousel.sass'

class MyCarousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: 0,
      openPopup: false,
      galleryWidth: 0,
      minsWidth: 0
    }
  }

  componentDidMount () {
    let gall = document.querySelector('.gallery').clientWidth
    let minsWidth = (gall / 4) * this.props.data.length
    this.setState({
      galleryWidth: gall,
      minsWidth
    })
    let prevAndNext = function (e) {
      if (e.keyCode === 39) {
        this.nextBtn(e)
      }
      if (e.keyCode === 37) {
        this.prevBtn(e)
      }
    }
    prevAndNext = prevAndNext.bind(this)
    document.addEventListener('keydown', prevAndNext)
  }

  nextBtn (e) {
    e.stopPropagation()
    const { activeIndex } = this.state
    const length = this.props.data.length
    if (activeIndex < length - 1) {
      this.setState({
        activeIndex: activeIndex + 1
      })
    } else {
      this.setState({
        activeIndex: 0
      })
    }
  }

  prevBtn (e) {
    e.stopPropagation()
    const { activeIndex } = this.state
    const length = this.props.data.length
    if (activeIndex > 0) {
      this.setState({
        activeIndex: activeIndex - 1
      })
    } else {
      this.setState({
        activeIndex: length - 1
      })
    }
  }

  togglePopup () {
    this.setState({
      openPopup: !this.state.openPopup
    })
  }

  setActiveIndex (index) {
    this.setState({
      activeIndex: index
    })
  }

  render () {
    const { openPopup,
            galleryWidth,
            minsWidth,
            activeIndex } = this.state

    if (!galleryWidth || !minsWidth) {
      return null
    }

    let itemWidth = galleryWidth / 4 - 5
    let itemStyle = {
      width: `${itemWidth}px`
    }
    let blockWidth = (galleryWidth / 4) * this.props.data.length
    let mLeft = 0
    if (activeIndex > 0 && activeIndex < this.props.data.length - 1) {
      mLeft = (galleryWidth / 4) * activeIndex
    } else if (activeIndex > 0 && activeIndex === this.props.data.length - 1) {
      mLeft = 0
    }
    let blockStyle = {
      width: `${blockWidth}px`,
      left: `-${mLeft}px`
    }

    const navLine = this.props.data.map((item, index) => {
      return <div key={item.id} style={itemStyle} className='nav-item'><img src={item.url} alt='min-nav-img' onClick={() => this.setActiveIndex(index)} /></div>
    })

    const carouselMin = this.props.data.map((item, index) => {
      let className = 'item'
      if (index === this.state.activeIndex) {
        className += '-active'
      }
      return <img key={item.id} alt='slider' className={className} src={this.props.data[index].url} onClick={() => this.togglePopup()} />
    })

    let style = { display: 'block' }
    if (!openPopup) {
      style = { display: 'none' }
    }
    return (
      <div className='my-carousel'>
        <div className='my-carousel-min'>
          {carouselMin}
          <img
            className='carousel-now'
            alt='slider'
            src={this.props.data[this.state.activeIndex].url}
            onClick={() => this.togglePopup()}
          />
          <button
            className='btn-prev'
            onClick={(e) => this.prevBtn(e)}
          >
            <i className='fas fa-chevron-left' />
          </button>
          <button
            className='btn-next'
            onClick={(e) => this.nextBtn(e)}
          >
            <i className='fas fa-chevron-right' />
          </button>
        </div>
        <div
          className='my-carousel-nav'
          style={blockStyle}
        >
          {navLine}
        </div>
        <div
          className='my-carousel-popup'
          style={style}
          onClick={(e) => {
            this.togglePopup()
          }}
        >
          {carouselMin}
          <button
            className='btn-close'
            onClick={() => this.togglePopup()}
          >
            <i className='fa fa-times' />
          </button>
          <button
            className='btn-prev'
            onClick={(e) => this.prevBtn(e)}
          >
            <i className='fas fa-chevron-left' />
          </button>
          <button
            className='btn-next'
            onClick={(e) => this.nextBtn(e)}
          >
            <i className='fas fa-chevron-right' />
          </button>
        </div>
      </div>
    )
  }
}

export default MyCarousel
