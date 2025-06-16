import { Star } from 'lucide-react'
import React from 'react'

const Testimonials = () => {
  return (
    <div className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Loved by <span className="text-purple-400">Creators</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 rounded-2xl border border-purple-500/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Nuevue transformed how I share my content. The platform is intuitive and my audience engagement has never been higher!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">SJ</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-gray-400">Content Creator</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 rounded-2xl border border-purple-500/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "The analytics are incredible! I can see exactly what my audience loves and optimize my content accordingly."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">MC</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Mike Chen</div>
                  <div className="text-sm text-gray-400">YouTuber</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 p-6 rounded-2xl border border-purple-500/20">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Fast, reliable, and beautiful. Nuevue makes video sharing feel effortless and professional."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">AR</span>
                </div>
                <div className="ml-3">
                  <div className="font-semibold">Alex Rivera</div>
                  <div className="text-sm text-gray-400">Film Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Testimonials