import React from 'react'

const Container = ({children}) => {
  return (
    <div>
      <div className='w-full max-w-7xl mx-auto'>{children}</div>
    </div>
  )
}

export default Container
