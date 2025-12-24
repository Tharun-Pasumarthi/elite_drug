import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-primary to-blue-900 text-white">
      {/* Contact Us Section */}
      <section id="contact" className="bg-gradient-to-br from-blue-600 via-primary to-blue-800 py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-blue-100">
              We're here to help with your pharmaceutical needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white hover:bg-white/20 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Email Us</h3>
              <a href="mailto:info@elitedrug.com" className="text-blue-100 hover:text-white transition-colors font-medium">
                info@elitedrug.com
              </a>
              <p className="text-blue-200 mt-2 text-sm">We'll respond within 24 hours</p>
            </div>

            {/* Phone */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white hover:bg-white/20 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Call Us</h3>
              <a href="tel:+1234567890" className="text-blue-100 hover:text-white transition-colors font-medium">
                +1 (234) 567-890
              </a>
              <p className="text-blue-200 mt-2 text-sm">Mon-Sat: 9AM - 6PM</p>
            </div>

            {/* Location */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:border-white hover:bg-white/20 transition-all text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Visit Us</h3>
              <p className="text-blue-100">
                123 Healthcare Avenue<br/>
                Medical District<br/>
                Your City, ST 12345
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <div className="py-16 bg-blue-900/50">
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
              <p className="text-xs text-blue-200 ml-14">enhancing your health</p>
            </div>
            <p className="text-blue-200 leading-relaxed">
              Transforming healthcare through innovative medical technology and comprehensive solutions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/categories/diabetes" className="text-blue-200 hover:text-white transition-colors">
                  Diabetes Care
                </Link>
              </li>
              <li>
                <Link href="/categories/heart-care" className="text-blue-200 hover:text-white transition-colors">
                  Heart & Cardiovascular
                </Link>
              </li>
              <li>
                <Link href="/categories/stomach-care" className="text-blue-200 hover:text-white transition-colors">
                  Gastro & Digestive
                </Link>
              </li>
              <li>
                <Link href="/categories/womens-health" className="text-blue-200 hover:text-white transition-colors">
                  Women's Health
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-blue-200 hover:text-white transition-colors font-semibold">
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/#about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              
              
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-blue-200">
              <li>Email: info@medicare-solutions.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Medical Plaza</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-blue-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-blue-200 text-sm">
            &copy; {new Date().getFullYear()} Elite Drug. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-blue-200 hover:text-white transition-colors">
              Compliance
            </Link>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
}
