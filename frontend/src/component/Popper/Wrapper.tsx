import React, { ReactNode } from 'react'
interface WrapperProps {
    children: ReactNode;
  }
const Wrapper: React.FC<WrapperProps>  = ({children}) => {
  return (
    <div className=' max-h-custom min-h-28 bg-white shadow-custom overflow-hidden rounded-lg w-full pt-2'>
        {children}
    </div>
  )
}

export default Wrapper