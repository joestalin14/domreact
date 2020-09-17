import React from 'react'

import { DataConsumer } from '../data-service-context'

const withDataService = (Wrapped) => {
  return (props) => {
    return (
      <DataConsumer>
        {
          (dataService) => {
            return (
              <Wrapped
                {...props}
                dataService={dataService}
              />
            )
          }
        }
      </DataConsumer>
    )
  }
}

export default withDataService
