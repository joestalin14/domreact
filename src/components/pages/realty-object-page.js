import React, { Component } from 'react'
import DOMPurify from 'dompurify'
import { YMaps, Map, Placemark, ZoomControl } from 'react-yandex-maps'

import './realty-object-page.sass'

import { withDataService } from '../hoc'
import MyCarousel from '../my-carousel'
import ContactForm from '../contact-form'
import Spinner from '../spinner'

class RealtyObjectPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      contactFormView: false
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dataService
      .getRealty()
      .then((realty) => {
        const data = realty.find(({ id }) => id === +this.props.itemId.slice(1))
        this.setState({ data })
        this.props.dataService
          .getAuthorData(data.author)
          .then((author) => {
            this.setState({ author })
          })
      })
  }

  contactFormToggle () {
    this.setState({
      contactFormView: !this.state.contactFormView
    })
  }

  render () {
    const { data,
            author,
            contactFormView } = this.state

    if (!data || !author) {
      return <div className='realty-object-page loading'><Spinner /></div>
    }

    const { title,
            formatedPrice,
            village,
            houseFloors,
            houseBedrooms,
            repairs,
            houseArea,
            type,
            plot,
            description,
            yamap,
            video } = data

    let mapBlockClassList = 'map'
    if (video) {
      mapBlockClassList = 'map-video'
    }

    const coords = JSON.parse(yamap).marks[0].coords
    const mapData = {
      center: coords,
      zoom: 14,
      width: '100%',
      height: '300px'
    }

    return (
      <div className='realty-object-page'>
        <div className='realty-first-block'>
          <div className='gallery'>
            <MyCarousel data={data.gallery} />
          </div>
          <div className='description'>
            <h1>{title}</h1>
            <p className='price'>{formatedPrice} ₽</p>
            <div className='item-parameters'>
              <p>Площадь (м.кв.): <span>{houseArea}</span></p>
              <p>Количество этажей: <span>{houseFloors}</span></p>
              <p>Тип недвижимости: <span>{type.label}</span></p>
              <p>Количество спален: <span>{houseBedrooms}</span></p>
              <p>Участок (сот.): <span>{plot}</span></p>
              <p>Отделка: <span>{repairs.label}</span></p>
              <p>Поселок: <span>{village}</span></p>
            </div>
            <button className='btn btn-green btn-md' onClick={() => this.contactFormToggle()}>Назначить просмотр</button>
            <div className='author-block'>
              <div className='author-img'>
                <img src={author.img} alt='author' />
              </div>
              <div className='author-description'>
                <p className='name'>{author.name}</p>
                <p>Эксперт проекта</p>
                <a href={`tel:${author.phone}`}>{author.phone}</a>
              </div>
            </div>
          </div>
        </div>
        { contactFormView ? <ContactForm author={author} contactFormToggle={() => this.contactFormToggle()} /> : null }
        <div className='realty-second-block'>
          <div
            className='description'
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description)}}
            />
        </div>
        <div className={mapBlockClassList}>
          <div className='map-inner'>
            <YMaps>
              <Map width='100%' defaultState={mapData}>
                <Placemark geometry={coords} />
                <ZoomControl options={{ float: 'right' }} />
              </Map>
            </YMaps>
          </div>
          <div
            className='video-inner'
            dangerouslySetInnerHTML={{ __html: video}}
          />
        </div>
      </div>
    )
  }
}

export default withDataService(RealtyObjectPage)
