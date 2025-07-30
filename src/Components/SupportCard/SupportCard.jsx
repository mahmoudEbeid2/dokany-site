import React from 'react'
import "./SupportCard.css"

function SupportCard({children , title , description}) {
  return (
    <div className=' col-sm-6 col-md-3  col-6'>
      <div className="sapurt-card flex-column">

      {children}
      <h2>{title}</h2>
      <p>{description}</p>
      </div>

      
    </div>
  )
}

export default SupportCard
