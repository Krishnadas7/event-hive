import React from 'react'
import {Oval} from 'react-loader-spinner'


function Loader() {
  return (
    <div className=''>
       <Oval
      visible={true}
      height={20}
      width={20}
      color="#FFFFFF"
      ariaLabel="oval-loading"
      wrapperStyle={{ display: 'inline-block', marginLeft: '5px' }}
    />
    </div>
  )
}

export default Loader