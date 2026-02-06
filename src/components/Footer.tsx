import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary to-blue-900 dark:from-slate-900 dark:to-slate-950 text-white">
      {/* Contact Us Section */}
      <section id="contact" className="bg-gradient-to-br from-blue-600 via-primary to-blue-800 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-blue-100 dark:text-gray-300">
              We're here to help with your pharmaceutical needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/20 dark:border-slate-700 hover:border-white dark:hover:border-orange-500 hover:bg-white/20 dark:hover:bg-slate-800/70 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white dark:text-gray-100">Email Us</h3>
              <a href="mailto:info@elitedrug.com" className="text-blue-100 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors font-medium">
                info@elitedrug.com
              </a>
              <p className="text-blue-200 dark:text-gray-400 mt-2 text-sm">We'll respond within 24 hours</p>
            </div>

            {/* Phone */}
            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/20 dark:border-slate-700 hover:border-white dark:hover:border-orange-500 hover:bg-white/20 dark:hover:bg-slate-800/70 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white dark:text-gray-100">WhatsApp Us</h3>
              <a href="https://wa.me/919182351261" target="_blank" rel="noopener noreferrer" className="text-blue-100 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors font-medium">
                +91 9182351261
              </a>
              <p className="text-blue-200 dark:text-gray-400 mt-2 text-sm">Mon-Sat: 9AM - 6PM</p>
            </div>

            {/* Location */}
            <div className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/20 dark:border-slate-700 hover:border-white dark:hover:border-orange-500 hover:bg-white/20 dark:hover:bg-slate-800/70 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white dark:text-gray-100">Visit Us</h3>
              <p className="text-blue-100 dark:text-gray-300 text-sm leading-relaxed">
                Admin Office:<br/>
                #440, 3rd C.K. Nagara,<br/>
                Hosa Road, Electronic City Post,<br/>
                Bangalore – 560100
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="py-16 bg-blue-900/50 dark:bg-slate-900/80">
        <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <Image 
                  src="/logo.png" 
                  alt="Elite Drug Logo" 
                  width={40} 
                  height={40} 
                  className="h-10 w-10 object-contain bg-white rounded-lg p-1"
                />
                <span className="text-xl font-bold lowercase" style={{ color: '#FF8C00' }}>elite drug</span>
              </div>
              <p className="text-xs text-white dark:text-white ml-14">enhancing your health</p>
            </div>
            <p className="text-blue-200 dark:text-gray-300 leading-relaxed mb-3">
              Quality pharmaceutical products for better health and wellness.
            </p>
            <p className="text-xs text-blue-300 dark:text-gray-400 leading-relaxed">
              Mfg. Lic. No.:<br/>
              MNB/22/1183 & MB/22/1184
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/diabetes" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
                  Diabetes Care
                </Link>
              </li>
              <li>
                <Link href="/categories/heart-care" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
                  Heart & Cardiovascular
                </Link>
              </li>
              <li>
                <Link href="/categories/stomach-care" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
                  Gastro & Digestive
                </Link>
              </li>
              <li>
                <Link href="/categories/womens-health" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
                  Women's Health
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors font-semibold">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Our Journey</h4>
            <ul className="space-y-4 text-blue-200 dark:text-gray-300 text-sm">
              <li>
                <div className="font-semibold text-white dark:text-gray-100 mb-1">🏗️ Founded 2016</div>
                <p className="text-xs leading-relaxed">Started with a vision to provide quality pharmaceuticals</p>
              </li>
              <li>
                <div className="font-semibold text-white dark:text-gray-100 mb-1">📈 Growing Today</div>
                <p className="text-xs leading-relaxed">Expanding product range across 13+ therapeutic categories</p>
              </li>
              <li>
                <div className="font-semibold text-white dark:text-gray-100 mb-1">🚀 Future Vision</div>
                <p className="text-xs leading-relaxed">Leading India's pharmaceutical innovation & healthcare accessibility</p>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Contact</h4>
            <ul className="space-y-3 text-blue-200 dark:text-gray-300 text-sm">
              <li>
                <span className="text-blue-300 dark:text-gray-400">Email: </span>
                <a href="mailto:info@elitedrug.com" className="hover:text-white dark:hover:text-orange-400 transition-colors">
                  info@elitedrug.com
                </a>
              </li>
              <li>
                <span className="text-blue-300 dark:text-gray-400">WhatsApp: </span>
                <a href="https://wa.me/919182351261" target="_blank" rel="noopener noreferrer" className="hover:text-white dark:hover:text-orange-400 transition-colors">
                  +91 9182351261
                </a>
              </li>
              <li className="text-xs leading-relaxed mt-3">
                #440, 3rd C.K. Nagara,<br/>
                Hosa Road, Electronic City,<br/>
                Bangalore – 560100
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-700/50 dark:border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 dark:text-gray-300 text-sm">
            &copy; 2016-{new Date().getFullYear()} Elite Drug. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/compliance" className="text-blue-200 dark:text-gray-300 hover:text-white dark:hover:text-orange-400 transition-colors">
              Compliance
            </Link>
            <Link 
              href="/admin" 
              className="text-blue-300/50 dark:text-gray-500 hover:text-white dark:hover:text-orange-400 transition-colors text-xs"
              title="Admin Dashboard"
            >
              •
            </Link>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
