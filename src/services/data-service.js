export default class DataService {

  _logoUrl = 'http://domaurorareact:3001/wp-json/wp/v2/logo'

  _postsUrl = 'http://domaurorareact:3001/wp-json/wp/v2/posts'

  _mainNavUrl = 'http://domaurorareact:3001/wp-json/menus/v1/menus/2'

  _feedbackUrl = 'http://domaurorareact:3001/wp-json/wp/v2/feedback/'

  _realtyUrl = 'http://domaurorareact:3001/wp-json/wp/v2/realty?per_page=100'

  _mainPageUrl = 'http://domaurorareact:3001/wp-json/wp/v2/pages/32'

  _buyerPageUrl = 'http://domaurorareact:3001/wp-json/wp/v2/pages/161'

  _salerPageUrl = 'http://domaurorareact:3001/wp-json/wp/v2/pages/163'

  _pdfArticlesUrl = 'http://domaurorareact:3001/wp-json/wp/v2/pdf_articles'

  _menuSidebarUrl = 'http://domaurorareact:3001/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-2'

  _footerSidebarUrl = 'http://domaurorareact:3001/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-3'

  _headerSidebarUrl = 'http://domaurorareact:3001/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-4'

  _sortSidebarUrl = 'http://domaurorareact:3001/wp-json/wp-rest-api-sidebars/v1/sidebars/sidebar-5'

  _hasKey = (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      return obj[key]
    }
    return null
  }

  _hasAttributes = (obj) => {
    let result = []
    if (obj.hasOwnProperty('atributes')) {
      for (let i=0; i<obj.atributes.length; i++) {
        result.push(obj.atributes[i].label)
      }
    }
    return result
  }

  _formatPrice = (num) => {
    if (!num) {
      return num
    }
    switch (num.length) {
      case 1:
      case 2:
      case 3:
        return num
      case 4:
        return num[0] + ' ' + num.slice(1)
      case 5:
        return num.slice(0, 2) + ' ' + num.slice(2)
      case 6:
        return num.slice(0, 3) + ' ' + num.slice(3)
      case 7:
        return num[0] + ' ' + num.slice(1, 4) + ' ' + num.slice(4)
      case 8:
        return num.slice(0, 2) + ' ' + num.slice(2, 5) + ' ' + num.slice(5)
      case 9:
        return num.slice(0, 3) + ' ' + num.slice(3, 6) + ' ' + num.slice(6)
      case 10:
        return num[0] + ' ' + num.slice(1, 4) + ' ' + num.slice(4, 7) + ' ' + num.slice(7)
      default:
        return num
    }
  }

  _transformPost = (post) => {
    return {
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      excerpt: post.excerpt.rendered
    }
  }

  _transformMainNav = (navItem) => {
    return {
      id: navItem.ID,
      label: navItem.post_title,
      url: navItem.url
    }
  }

  _transformFeedback = (feedback) => {
    return {
      id: feedback.id,
      img: feedback.acf.feedback_image,
      text: feedback.acf.feedback_text,
      author: feedback.acf.feedback_author,
      agent: feedback.acf.feedback_agent.data.display_name
    }
  }

  _transformRealty = (realty) => {
    return {
      id: realty.id,
      title: realty.title.rendered,
      type: realty.acf.realty_type,
      houseArea: +realty.acf.house_area,
      houseFloors: realty.acf.house_floors,
      houseBedrooms: +realty.acf.house_bedrooms,
      plot: realty.acf.plot,
      repairs: realty.acf.house_repairs,
      village: realty.acf.village,
      description: realty.acf.description,
      gallery: realty.acf.gallery,
      price: +realty.acf.price,
      formatedPrice: this._formatPrice(realty.acf.price),
      yamap: realty.acf.yamap,
      author: realty._links.author[0].href,
      video: this._hasKey(realty.acf, 'video'),
      date: Date.parse(realty.date),
      choise: this._hasKey(realty.acf, 'choise'),
      attributes: this._hasAttributes(realty.acf)
    }
  }

  _transformMainPageData = (data) => {
    return {
      mainTitle: data.acf['main-title'],
      mainImage: data.acf['main-image'],
      mainBtn1: data.acf['main-btn-1'],
      mainBtnActive1: data.acf['main-btn-1-active'],
      mainBtn2: data.acf['main-btn-2'],
      mainBtnActive2: data.acf['main-btn-2-active'],
      mainButtons: data.acf['main-buttons'],
      consultationTitle: data.acf['main-consultation-title'],
      consultationBtn: data.acf['main-consultation-btn'],
      saleTitle: data.acf['main-sale-title'],
      saleBtn: data.acf['main-sale-btn']
    }
  }

  _transformBuyerPageData = (data) => {
    return {
      title: data.title.rendered,
      content: data.content.rendered
    }
  }

  _transformSalerPageData = (data) => {
    return {
      title: data.title.rendered,
      content: data.content.rendered
    }
  }

  _transformPdfArticlesData = (data) => {
    return {
      id: data.id,
      title: data.title.rendered,
      link: data.acf['article_link'],
      img: data.acf['article_img']
    }
  }

  _transformMenuSidebarData = (data) => {
    return {
      data: data.rendered
    }
  }

  _transformSortSidebarData = (data) => {
    return {
      firstBlock: data.widgets[0].rendered,
      secondBlock: data.widgets[1].rendered
    }
  }

  _transformUserData = (data) => {
    return {
      name: data.name,
      img: data.acf['user-photo'],
      phone: data.acf['user-phone'],
      email: data.acf['user-email']
    }
  }

  getResource = async (url) => {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error (`Could not fetch, received ${res.status}`)
    }
    const body = await res.json()
    return body
  }

  getLogo = async () => {
    const res = await this.getResource(this._logoUrl)
    return res
  }

  getAllPosts = async () => {
    const res = await this.getResource(this._postsUrl)
    return res.map(this._transformPost)
  }

  getPost = async (id) => {
    const res = await this.getResource(`${this._postsUrl}/${id.slice(1)}`)
    return {
      title: res.title.rendered,
      content: res.content.rendered
    }
  }

  getMainNav = async () => {
    const res = await this.getResource(`${this._mainNavUrl}`)
    return res.items.map(this._transformMainNav)
  }

  getAllFeedbacks = async () => {
    const res = await this.getResource(`${this._feedbackUrl}`)
    return res.map(this._transformFeedback)
  }

  getRealty = async () => {
    const res = await this.getResource(`${this._realtyUrl}`)
    return res.map(this._transformRealty)
  }

  getMainPageData = async () => {
    const res = await this.getResource(`${this._mainPageUrl}`)
    return this._transformMainPageData(res)
  }

  getPdfArticlesData = async () => {
    const res = await this.getResource(`${this._pdfArticlesUrl}`)
    return res.map(this._transformPdfArticlesData)
  }

  getBuyerPageData = async () => {
    const res = await this.getResource(`${this._buyerPageUrl}`)
    return this._transformBuyerPageData(res)
  }

  getSalerPageData = async () => {
    const res = await this.getResource(`${this._salerPageUrl}`)
    return this._transformSalerPageData(res)
  }

  getAuthorData = async (url) => {
    const res = await this.getResource(url)
    return this._transformUserData(res)
  }

  getMinAndMaxPriceValue = async () => {
    const res = await this.getResource(`${this._realtyUrl}`)
    const data = res.map(this._transformRealty)
    let minResult = data[0].price
    let maxResult = data[0].price
    data.forEach(function(item, index, array) {
      if (item.price <= minResult) {
        minResult = item.price
      }
      if (item.price > maxResult) {
        maxResult = item.price
      }
    });
    return [minResult, maxResult]
  }

  getMinAndMaxHouseAreaValue = async () => {
    const res = await this.getResource(`${this._realtyUrl}`)
    const data = res.map(this._transformRealty)
    let minResult = data[0].houseArea
    let maxResult = data[0].houseArea
    data.forEach(function(item, index, array) {
      if (item.houseArea <= minResult) {
        minResult = item.houseArea
      }
      if (item.houseArea > maxResult) {
        maxResult = item.houseArea
      }
    });
    return [minResult, maxResult]
  }

  getMenuSidebarData = async () => {
    const res = await this.getResource(`${this._menuSidebarUrl}`)
    return this._transformMenuSidebarData(res)
  }

  getFooterSidebarData = async () => {
    const res = await this.getResource(`${this._footerSidebarUrl}`)
    return this._transformMenuSidebarData(res)
  }

  getHeaderSidebarData = async () => {
    const res = await this.getResource(`${this._headerSidebarUrl}`)
    return this._transformMenuSidebarData(res)
  }

  getSortSidebarData = async () => {
    const res = await this.getResource(`${this._sortSidebarUrl}`)
    return this._transformSortSidebarData(res)
  }
}
