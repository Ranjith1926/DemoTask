import React from 'react'

import './style.css';

export default function NotFound() {
  return (
    <div className='not-found flex flex-center'>
      <div className='main'>
        <img className='logo-img' src='../Assets/404.png' alt='404' />
        <div className='title'>Sorry, this page flew to the moon</div>
        <h3>Perhaps you would like to go to our <a href="/dashboard" className='link'>home page?</a></h3>
      </div>
    </div>
  )
}