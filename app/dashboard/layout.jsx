import React from 'react'
import Header from './_component/Header'

const DashboardLayout = ({children}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
  )
}

export default DashboardLayout
