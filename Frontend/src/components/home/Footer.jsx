import React from 'react'

const Footer = () => {
  return (
    <div>
       {/* Footer */}
      <footer className="bg-gradient-to-r from-[#A9B5DF] to-[#7886C7] px-8 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white mb-3 font-medium text-lg">© 2025 Lorem Ipsum. All rights reserved.</p>
          <p className="text-white/80 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/60">|</span>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer