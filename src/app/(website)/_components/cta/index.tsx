import { ArrowRight, CheckCircle } from 'lucide-react'
import React from 'react'

const CTA = () => {
  return (
    <div className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your
            <br />
            <span className="text-purple-400">Creative Journey?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join millions of creators who trust Nuevue to share their stories. 
            Your audience is waiting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-400" />
              No credit card required
            </div>
          </div>
        </div>
      </div>
  )
}

export default CTA