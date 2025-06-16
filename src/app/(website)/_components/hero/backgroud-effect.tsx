import React from 'react'

const BackgroundEffect = () => {
  return (
    <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
    </div>
  )
}

export default BackgroundEffect