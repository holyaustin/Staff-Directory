import Link from 'next/link';
import { FaFacebook, FaTwitter, FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-poly-blue text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-poly-gold">AIFP</h3>
            <p className="text-sm text-blue-200 leading-relaxed">
              Akanu Ibiam Federal Polytechnic, Unwana is committed to providing 
              quality education and fostering academic excellence in Nigeria.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-blue-300 hover:text-poly-gold transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-poly-gold transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-poly-gold transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-blue-300 hover:text-poly-gold transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/staff" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Staff Directory
                </Link>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-poly-gold transition-colors">
                  E-Library
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Departments</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/?department=dept001" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Computer Science
                </Link>
              </li>
              <li>
                <Link href="/?department=dept002" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Information Technology
                </Link>
              </li>
              <li>
                <Link href="/?department=dept003" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link href="/?department=dept004" className="text-blue-200 hover:text-poly-gold transition-colors">
                  Business Administration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <FaMapMarker className="mt-1 text-poly-gold flex-shrink-0" />
                <span className="text-blue-200">Unwana, Afikpo, Ebonyi State, Nigeria</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-poly-gold flex-shrink-0" />
                <span className="text-blue-200">+234 803 456 7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-poly-gold flex-shrink-0" />
                <span className="text-blue-200">info@polyunwana.edu.ng</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 mt-8 pt-6 text-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Akanu Ibiam Federal Polytechnic, Unwana. All rights reserved.</p>
          <p className="mt-1 text-xs">
            Designed and Implemented as a Staff Directory Information System Project
          </p>
        </div>
      </div>
    </footer>
  );
}