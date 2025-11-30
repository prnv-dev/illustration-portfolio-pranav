import React from 'react'

export default function Footer() {
  return (
    <div className='bg-black px-5 lg:px-28 py-3 lg:py-6 flex items-center justify-between mt-16'>
      <img className='invert h-5 lg:h-9' src="/assets/logo.svg" alt="" />
<p className="text-white/70 text-sm mt-2">
  Need more info?  
  My personal AI assistant <strong>Rio</strong> is always online.  
  Ask him anything — projects, skills, experience, or tech guidance 🔥🤖
</p>

      <div className='text-white lg:font-semibold lg:text-sm font-normal text-[10px] text-right lg:space-y-3'>
        <p>@ 2025 Personal Portfolio</p>
        <p>Made by Pranav</p>
      </div>
    </div>
  )
}
