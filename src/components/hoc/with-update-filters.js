import React from 'react'

const withUpdateFilters = (Wrapped) => {
  return (props) => {
    return (
      <Wrapped
        {...props}
        updFilters={(filters, realty) => {
          if (!filters || !realty) {
            return
          }
          const filtersData = filters.split('&')
          const mappedFiltersData = filtersData.map((item) => {
            if (item === '') {
              return item
            }
            const itemArr = item.split('=')
            if (itemArr[0] === 'type') {
              itemArr[0] = 1
            }
            if (itemArr[0] === 'floors') {
              itemArr[0] = 2
            }
            if (itemArr[0] === 'repairs') {
              itemArr[0] = 3
            }
            if (itemArr[0] === 'bedrooms') {
              itemArr[0] = 4
            }
            if (itemArr[0] === 'price') {
              itemArr[0] = 5
            }
            if (itemArr[0] === 'area') {
              itemArr[0] = 6
            }
            if (itemArr[0] === 'village') {
              itemArr[0] = 7
            }
            if (itemArr[0] === 'attributes') {
              itemArr[0] = 8
            }
            if (itemArr[0] === 'sort') {
              itemArr[0] = 9
            }
            if (itemArr[1] && itemArr[1].includes(',')) {
              itemArr[1] = itemArr[1].split(',')
            }
            return itemArr
          })
          mappedFiltersData.sort((a, b) => a[0] - b[0])
          let newData = null
          for (const filter of mappedFiltersData) {
            if (filter === undefined) {
              return
            }
            if (filter[0] === 1) {
              const houses = [...realty.filter(({ type }) => type.value === 'house').slice()]
              const townhouses = [...realty.filter(({ type }) => type.value === 'townhouse').slice()]
              const duplexes = [...realty.filter(({ type }) => type.value === 'duplex').slice()]
              const plots = [...realty.filter(({ type }) => type.value === 'plot').slice()]
              newData = []
              if (filter[1].includes('house') && !filter[1].includes('townhouse')) {
                newData = [
                  ...newData.slice(),
                  ...houses
                ]
              }
              if (filter[1].includes('townhouse')) {
                newData = [
                  ...newData.slice(),
                  ...townhouses
                ]
              }
              if (filter[1].includes('duplex')) {
                newData = [
                  ...newData.slice(),
                  ...duplexes
                ]
              }
              if (filter[1].includes('plot')) {
                newData = [
                  ...newData.slice(),
                  ...plots
                ]
              }
              if (!filter[1]) {
                newData = [
                  ...houses,
                  ...townhouses,
                  ...duplexes,
                  ...plots
                ]
              }
            }
            if (filter[0] === 2) {
              let one, two, three, four
              if (newData === null) {
                one = [...realty.filter(({ houseFloors }) => houseFloors === '1').slice()]
                two = [...realty.filter(({ houseFloors }) => houseFloors === '2').slice()]
                three = [...realty.filter(({ houseFloors }) => houseFloors === '3').slice()]
                four = [...realty.filter(({ houseFloors }) => houseFloors === '4').slice()]
                newData = []
                if (filter[1].includes('1')) {
                  newData = [
                    ...newData.slice(),
                    ...one
                  ]
                }
                if (filter[1].includes('2')) {
                  newData = [
                    ...newData.slice(),
                    ...two
                  ]
                }
                if (filter[1].includes('3')) {
                  newData = [
                    ...newData.slice(),
                    ...three
                  ]
                }
                if (filter[1].includes('4')) {
                  newData = [
                    ...newData.slice(),
                    ...four
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...one,
                    ...two,
                    ...three,
                    ...four
                  ]
                }
              } else if (newData.length > 0) {
                one = [...newData.filter(({ houseFloors }) => houseFloors === '1').slice()]
                two = [...newData.filter(({ houseFloors }) => houseFloors === '2').slice()]
                three = [...newData.filter(({ houseFloors }) => houseFloors === '3').slice()]
                four = [...newData.filter(({ houseFloors }) => houseFloors === '4').slice()]
                newData = []
                if (filter[1].includes('1')) {
                  newData = [
                    ...newData.slice(),
                    ...one
                  ]
                }
                if (filter[1].includes('2')) {
                  newData = [
                    ...newData.slice(),
                    ...two
                  ]
                }
                if (filter[1].includes('3')) {
                  newData = [
                    ...newData.slice(),
                    ...three
                  ]
                }
                if (filter[1].includes('4')) {
                  newData = [
                    ...newData.slice(),
                    ...four
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...one,
                    ...two,
                    ...three,
                    ...four
                  ]
                }
              }
            }
            if (filter[0] === 3) {
              let none, turnkey, yes
              if (newData === null) {
                none = [...realty.filter(({ repairs }) => repairs.value === 'none').slice()]
                turnkey = [...realty.filter(({ repairs }) => repairs.value === 'turnkey').slice()]
                yes = [...realty.filter(({ repairs }) => repairs.value === 'yes').slice()]
                newData = []
                if (filter[1].includes('none')) {
                  newData = [
                    ...newData.slice(),
                    ...none
                  ]
                }
                if (filter[1].includes('turnkey')) {
                  newData = [
                    ...newData.slice(),
                    ...turnkey
                  ]
                }
                if (filter[1].includes('yes')) {
                  newData = [
                    ...newData.slice(),
                    ...yes
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...none,
                    ...turnkey,
                    ...yes
                  ]
                }
              } else if (newData.length > 0) {
                none = [...newData.filter(({ repairs }) => repairs.value === 'none').slice()]
                turnkey = [...newData.filter(({ repairs }) => repairs.value === 'turnkey').slice()]
                yes = [...newData.filter(({ repairs }) => repairs.value === 'yes').slice()]
                newData = []
                if (filter[1].includes('none')) {
                  newData = [
                    ...newData.slice(),
                    ...none
                  ]
                }
                if (filter[1].includes('turnkey')) {
                  newData = [
                    ...newData.slice(),
                    ...turnkey
                  ]
                }
                if (filter[1].includes('yes')) {
                  newData = [
                    ...newData.slice(),
                    ...yes
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...none,
                    ...turnkey,
                    ...yes
                  ]
                }
              }
            }
            if (filter[0] === 4) {
              let one, two, three, four, five
              if (newData === null) {
                one = [...realty.filter(({ houseBedrooms }) => houseBedrooms === 1).slice()]
                two = [...realty.filter(({ houseBedrooms }) => houseBedrooms === 2).slice()]
                three = [...realty.filter(({ houseBedrooms }) => houseBedrooms === 3).slice()]
                four = [...realty.filter(({ houseBedrooms }) => houseBedrooms === 4).slice()]
                five = [...realty.filter(({ houseBedrooms }) => houseBedrooms >= 5).slice()]
                newData = []
                if (filter[1].includes('1')) {
                  newData = [
                    ...newData.slice(),
                    ...one
                  ]
                }
                if (filter[1].includes('2')) {
                  newData = [
                    ...newData.slice(),
                    ...two
                  ]
                }
                if (filter[1].includes('3')) {
                  newData = [
                    ...newData.slice(),
                    ...three
                  ]
                }
                if (filter[1].includes('4')) {
                  newData = [
                    ...newData.slice(),
                    ...four
                  ]
                }
                if (filter[1].includes('5')) {
                  newData = [
                    ...newData.slice(),
                    ...five
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...one,
                    ...two,
                    ...three,
                    ...four,
                    ...five
                  ]
                }
              } else if (newData.length > 0) {
                one = [...newData.filter(({ houseBedrooms }) => houseBedrooms === 1).slice()]
                two = [...newData.filter(({ houseBedrooms }) => houseBedrooms === 2).slice()]
                three = [...newData.filter(({ houseBedrooms }) => houseBedrooms === 3).slice()]
                four = [...newData.filter(({ houseBedrooms }) => houseBedrooms === 4).slice()]
                five = [...newData.filter(({ houseBedrooms }) => houseBedrooms >= 5).slice()]
                newData = []
                if (filter[1].includes('1')) {
                  newData = [
                    ...newData.slice(),
                    ...one
                  ]
                }
                if (filter[1].includes('2')) {
                  newData = [
                    ...newData.slice(),
                    ...two
                  ]
                }
                if (filter[1].includes('3')) {
                  newData = [
                    ...newData.slice(),
                    ...three
                  ]
                }
                if (filter[1].includes('4')) {
                  newData = [
                    ...newData.slice(),
                    ...four
                  ]
                }
                if (filter[1].includes('5')) {
                  newData = [
                    ...newData.slice(),
                    ...five
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...one,
                    ...two,
                    ...three,
                    ...four,
                    ...five
                  ]
                }
              }
            }
            if (filter[0] === 5) {
              if (newData === null) {
                newData = [
                  ...realty.filter(({price}) => price >= filter[1][0] && price <= filter[1][1])
                ]
              } else if (newData.length > 0) {
                newData = [
                  ...newData.filter(({price}) => price >= filter[1][0] && price <= filter[1][1])
                ]
              }
            }
            if (filter[0] === 6) {
              if (newData === null) {
                newData = [
                  ...realty.filter(({houseArea}) => houseArea >= filter[1][0] && houseArea <= filter[1][1])
                ]
              } else if (newData.length > 0) {
                newData = [
                  ...newData.filter(({houseArea}) => houseArea >= filter[1][0] && houseArea <= filter[1][1])
                ]
              }
            }
            if (filter[0] === 7) {
              let cherovitsy, otradnoe, medovka
              if (newData === null) {
                cherovitsy = [...realty.filter(({ village }) => village === 'Чертовицы').slice()]
                otradnoe = [...realty.filter(({ village }) => village === 'Отрадное').slice()]
                medovka = [...realty.filter(({ village }) => village === 'Медовка').slice()]
                newData = []
                if (filter[1].includes('Чертовицы')) {
                  newData = [
                    ...newData.slice(),
                    ...cherovitsy
                  ]
                }
                if (filter[1].includes('Отрадное')) {
                  newData = [
                    ...newData.slice(),
                    ...otradnoe
                  ]
                }
                if (filter[1].includes('Медовка')) {
                  newData = [
                    ...newData.slice(),
                    ...medovka
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...cherovitsy,
                    ...otradnoe,
                    ...medovka
                  ]
                }
              } else if (newData.length > 0) {
                let cherovitsy, otradnoe, medovka
                if (newData === null) {
                  cherovitsy = [...newData.filter(({ village }) => village === 'Чертовицы').slice()]
                  otradnoe = [...newData.filter(({ village }) => village === 'Отрадное').slice()]
                  medovka = [...newData.filter(({ village }) => village === 'Медовка').slice()]
                  newData = []
                  if (filter[1].includes('Чертовицы')) {
                    newData = [
                      ...newData.slice(),
                      ...cherovitsy
                    ]
                  }
                  if (filter[1].includes('Отрадное')) {
                    newData = [
                      ...newData.slice(),
                      ...otradnoe
                    ]
                  }
                  if (filter[1].includes('Медовка')) {
                    newData = [
                      ...newData.slice(),
                      ...medovka
                    ]
                  }
                  if (!filter[1]) {
                    newData = [
                      ...cherovitsy,
                      ...otradnoe,
                      ...medovka
                    ]
                  }
                }
              }
            }
            if (filter[0] === 8) {
              let design, water, forest, child, pool
              if (newData === null) {
                design = [...realty.filter(({ attributes }) => attributes.includes('Ландшафтный дизайн на участке')).slice()]
                water = [...realty.filter(({ attributes }) => attributes.includes('У воды')).slice()]
                forest = [...realty.filter(({ attributes }) => attributes.includes('У леса')).slice()]
                child = [...realty.filter(({ attributes }) => attributes.includes('Детский сад рядом')).slice()]
                pool = [...realty.filter(({ attributes }) => attributes.includes('Бассейн на участке')).slice()]
                newData = []
                if (filter[1].includes('Ландшафтный дизайн на участке')) {
                  newData = [
                    ...newData.slice(),
                    ...design
                  ]
                }
                if (filter[1].includes('У воды')) {
                  newData = [
                    ...newData.slice(),
                    ...water
                  ]
                }
                if (filter[1].includes('У леса')) {
                  newData = [
                    ...newData.slice(),
                    ...forest
                  ]
                }
                if (filter[1].includes('Детский сад рядом')) {
                  newData = [
                    ...newData.slice(),
                    ...child
                  ]
                }
                if (filter[1].includes('Бассейн на участке')) {
                  newData = [
                    ...newData.slice(),
                    ...pool
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...design,
                    ...water,
                    ...forest,
                    ...child,
                    ...pool
                  ]
                }
              } else if (newData.length > 0) {
                design = [...newData.filter(({ attributes }) => attributes.includes('Ландшафтный дизайн на участке')).slice()]
                water = [...newData.filter(({ attributes }) => attributes.includes('У воды')).slice()]
                forest = [...newData.filter(({ attributes }) => attributes.includes('У леса')).slice()]
                child = [...newData.filter(({ attributes }) => attributes.includes('Детский сад рядом')).slice()]
                pool = [...newData.filter(({ attributes }) => attributes.includes('Бассейн на участке')).slice()]
                newData = []
                if (filter[1].includes('Ландшафтный дизайн на участке')) {
                  newData = [
                    ...newData.slice(),
                    ...design
                  ]
                }
                if (filter[1].includes('У воды')) {
                  newData = [
                    ...newData.slice(),
                    ...water
                  ]
                }
                if (filter[1].includes('У леса')) {
                  newData = [
                    ...newData.slice(),
                    ...forest
                  ]
                }
                if (filter[1].includes('Детский сад рядом')) {
                  newData = [
                    ...newData.slice(),
                    ...child
                  ]
                }
                if (filter[1].includes('Бассейн на участке')) {
                  newData = [
                    ...newData.slice(),
                    ...pool
                  ]
                }
                if (!filter[1]) {
                  newData = [
                    ...design,
                    ...water,
                    ...forest,
                    ...child,
                    ...pool
                  ]
                }
              }
            }
            if (filter[0] === 9) {
              if (newData === null) {
                if (filter[1] === 'min') {
                  newData = [
                    ...realty.sort((a, b) => a.price - b.price)
                  ]
                }
                if (filter[1] === 'max') {
                  newData = [
                    ...realty.sort((a, b) => b.price - a.price)
                  ]
                }
                if (filter[1] === 'date') {
                  newData = [
                    ...realty.sort((a, b) => b.date - a.date)
                  ]
                }
              } else if (newData.length > 0) {
                if (filter[1] === 'min') {
                  newData = [
                    ...newData.sort((a, b) => a.price - b.price)
                  ]
                }
                if (filter[1] === 'max') {
                  newData = [
                    ...newData.sort((a, b) => b.price - a.price)
                  ]
                }
                if (filter[1] === 'date') {
                  newData = [
                    ...newData.sort((a, b) => b.date - a.date)
                  ]
                }
              }
            }

            function unique (arr) {
              let result = []
              if (!arr) {
                return result
              }
              for (let str of arr) {
                if (!result.includes(str)) {
                  result.push(str)
                }
              }
              return result
            }

            newData = unique(newData)
            return newData
          }
        }}
      />
    )
  }
}

export default withUpdateFilters
