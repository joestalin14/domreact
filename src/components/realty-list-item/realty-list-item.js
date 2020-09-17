import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './realty-list-item.sass'

import ContactForm from '../contact-form'
import { withDataService } from '../hoc'

class RealtyListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      contactFormView: false
    }
  }

  componentDidMount () {
    this.props.dataService
      .getAuthorData(this.props.realtyItem.author)
      .then((author) => {
        this.setState({ author })
      })
  }

  contactFormToggle () {
    this.setState({
      contactFormView: !this.state.contactFormView
    })
  }

  render () {
    const { realtyItem } = this.props
    const { contactFormView, author } = this.state
    console.log(author)

    let img = ''
    if (realtyItem.gallery) {
      img = realtyItem.gallery[0].sizes['medium_large']
    }

    const { title,
            formatedPrice,
            village,
            houseFloors,
            houseBedrooms,
            repairs,
            id,
            choise } = realtyItem

    let areaText = <p className='area'>{realtyItem.plot} сот.</p>
    if (realtyItem.type.value !== 'plot') {
      areaText = <p className='area'>{realtyItem.houseArea} м<sup>2</sup> | {realtyItem.plot} сот.</p>
    }

    let choiseLabel = null
    if (choise) {
      choiseLabel = <span className='choise-label'><i className='fas fa-thumbs-up' /> Выбор эксперта</span>
    }

    return (
      <div className='realty-list-item'>
        { contactFormView ? <ContactForm author={author} contactFormToggle={() => this.contactFormToggle()} /> : null }
        <div className='realty-list-item-img'>
          {choiseLabel}
          <img
            src={img}
            alt='realty'
          />
        </div>
        <div className='realty-list-item-description'>
          <h4>
            <Link to={`/объект/:${id}`}>{title}</Link>
          </h4>
          {areaText}
          <p className='price'>{formatedPrice} ₽</p>
          <div className='item-parameters'>
            <p>Поселок: <span>{village}</span></p>
            <p>Количество этажей: <span>{houseFloors}</span></p>
            <p>Количество спален: <span>{houseBedrooms}</span></p>
            <p>Отделка: <span>{repairs.label}</span></p>
          </div>
          <div className='item-btns'>
            <Link className='btn btn-gray' to={`/объект/:${id}`} >Подробнее</Link>
            <button className='btn btn-green' onClick={() => this.contactFormToggle()}>Назначить просмотр</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withDataService(RealtyListItem)
