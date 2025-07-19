import React from 'react'
import  OutPutProvider  from './OutputContext'
import Outputs from './Outputs'

export default function OutputContextProvider() {
  return (
    <div className='w-full h-full'>
        <OutPutProvider>
            <Outputs />
        </OutPutProvider>
      
    </div>
  )
}
