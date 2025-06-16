import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-purple-500/20 py-8">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Nuevue. All rights reserved. Made with ❤️ for creators worldwide.</p>
        </div>
      </footer>
  )
}

export default Footer