import React from 'react'
import SupportCard from './SupportCard'

function SupportSection() {
    let suportList= [{
        title: 'Free Shoping',
        description: 'Order above $200',
        icon: <i className="bi bi-truck"></i>
    },
    {
        title: 'Money-back',
        description: '30 days guarantee',
        icon: <i className="bi bi-cash"></i>
    },
    {
        title: 'Secure Payments',
        description: 'Secured by Stripe',
        icon: <i className="bi bi-lock"></i>
    },
    {
        title: '24/7 Support',
        description: 'Phone and Email support',
        icon: <i className="bi bi-telephone"></i>
    }]
  return (
    <div className='container mt-5'>
        <div className='row justify-content-between'>
            {
                suportList.map((item , index) => {
                    return (
                    <SupportCard key={index}  title={item.title} description={item.description}>
                        {item.icon}
                    </SupportCard>
                )})
            }
        </div>
      
    </div>
  )
}

export default SupportSection
