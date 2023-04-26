import React from 'react'
import './welcomeStyle.css'
import { useNavigate } from 'react-router-dom'
import BgComponent from '../../assets/bg.svg'
import BgComponent2 from '../../assets/bg2.svg'

export default function Index() {
  const navigate=useNavigate();
  
  return (
    <div className='welcome-main'> 
      <div className='result-card'>
        <div className='bg-section'>
          <img src={BgComponent} alt='' className='backscore-img'/>
           <h1 className='bg-section-head'>Welcome !</h1>
           <img src={BgComponent2} alt='' className='backscore-img2'/>
        </div>
        <div className='text-section'>
          <h3 className='text-section-head'>would you like to start the survey ?</h3>
          <button className='button-29' onClick={()=>navigate('feedback')}>Start</button>
         </div>
      </div> 
    </div>
  )
}



