import { Upload, Play } from 'lucide-react'
import React from 'react'
import BackgroundEffect from './backgroud-effect'

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
        {/* Background Effects */}
        <BackgroundEffect />
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Share Your Story
              <br />
              <span className="text-purple-400">Connect The World</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              The next-generation video platform where creativity meets community. 
              Upload, discover, and share videos that inspire millions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <Play className="w-5 h-5" />
                Start Creating
              </button>
              <button className="border border-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300">
                <Upload className="w-5 h-5" />
                Upload Video
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Hero