import React from 'react'

import './spinner.sass'

const Spinner = () => {
  return (
    <div className='spinner'>
      <span>
        <span className='dot-1' />
        <span className='dot-2' />
        <span className='dot-3' />
      </span>
    </div>
  )
}

export default Spinner
