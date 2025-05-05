import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-950 to-purple-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-indigo-800 pb-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">TechHive</h3>
            <p className="text-indigo-300">
              Your go-to destination for cutting-edge technology solutions and seamless user experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About", "Services", "Contact", "Blog"].map((item, idx) => (
                <li key={idx}>
                  <a href={`/${item.toLowerCase()}`} className="hover:text-yellow-300 transition-all duration-300 hover:underline">
                    {item === 'About' ? 'About Us' : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Support</h3>
            <ul className="space-y-2">
              {["FAQ", "Privacy-Policy", "Terms-Conditions"].map((item, idx) => (
                <li key={idx}>
                  <a href={`/${item.toLowerCase()}`} className="hover:text-yellow-300 transition-all duration-300 hover:underline">
                    {item === 'FAQ' ? 'FAQs' : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Get in Touch</h3>
            <p className="text-indigo-300">Email: support@techhive.com</p>
            <p className="text-indigo-300">Phone: +1 (555) 123-4567</p>
            <p className="text-indigo-300">Address: 123 TechHive Lane, Silicon Valley, CA</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-indigo-400 text-sm">
            © {new Date().getFullYear()} TechHive. All rights reserved.
          </p>
          <div className="flex space-x-5 mt-4 sm:mt-0">
            {["facebook-f", "twitter", "linkedin-in", "instagram"].map((icon, idx) => (
              <a
                href="#"
                key={idx}
                className="text-indigo-400 hover:text-yellow-300 transition-all duration-300"
                aria-label={icon}
              >
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>

  );
}

export default Footer;
