import React from 'react'

const withFilterFunctions = (Wrapped) => {
  return (props) => {
    return (
      <Wrapped
        {...props}
        onSliderChange={(value, type) => {
          let path = props.history.location.pathname
          let newLocation
          if (path.includes(type)) {
            const locationArr = path.split('&')
            newLocation = locationArr.map((item) => {
              if (item.includes(type)) {
                const itemArr = item.split('=')
                itemArr[1] = `${value[0]},${value[1]}`
                return itemArr.join('=')
              }
              return item
            })
            newLocation = newLocation.join('&')
            props.history.push(newLocation)
            return
          } else {
            let newLocation = path + `${type}=${value[0]},${value[1]}&`
            props.history.push(newLocation)
          }
        }}

        toggleActiveFilters={(str, type) => {
          if (type.includes(str)) {
            const idx = type.findIndex((el) => el === str)
            const newData = [
              ...type.slice(0, idx),
              ...type.slice(idx + 1)
            ]
            return newData
          } else {
            const newData = [
              ...type.slice(),
              str
            ]
            return newData
          }
        }}

        onFilterChange={(name, value) => {
          let path = props.history.location.pathname
          let newLocation
          if (path.indexOf(name) > -1) {
            const locationArr = path.split('&')
            newLocation = locationArr.map((item) => {
              if (item.includes(name)) {
                const itemArr = item.split('=')
                if (itemArr[1].includes(',')) {
                  itemArr[1] = itemArr[1].split(',')
                } else {
                  itemArr[1] = [ itemArr[1] ]
                }
                if (itemArr[1].includes(value)) {
                  const idx = itemArr[1].findIndex((el) => el === value)
                  itemArr[1] = [
                    ...itemArr[1].slice(0, idx),
                    ...itemArr[1].slice(idx + 1)
                  ]
                } else {
                  itemArr[1] = [
                    ...itemArr[1].slice(),
                    value
                  ]
                }
                return itemArr.join('=')
              }
              return item
            })
            newLocation = newLocation.join('&')
            props.history.push(newLocation)
            return
          } else {
            newLocation = path + `${name}=${value}&`
            props.history.push(newLocation)
          }
        }}
      />
    )
  }
}

export default withFilterFunctions
