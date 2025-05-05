import React from "react";

function Contact() {
  return (
    <section className="bg-gradient-to-b from-indigo-950 to-gray-900 text-gray-200 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-indigo-500 mb-6">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-indigo-200">
            Got a question or need help? We’d love to hear from you. Reach out to us anytime!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-indigo-900/40 border border-indigo-700 rounded-2xl p-10 shadow-2xl">
          <form className="space-y-8">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-indigo-300 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-indigo-950 text-white rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-indigo-300 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-indigo-950 text-white rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-indigo-300 font-semibold mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message"
                className="w-full px-4 py-3 bg-indigo-950 text-white rounded-lg border border-indigo-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-indigo-400 transition"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-indigo-900 font-bold rounded-lg shadow-md transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-20 text-center text-indigo-300">
          <p className="text-lg">You can also reach us at:</p>
          <p className="mt-3">
            <a
              href="mailto:support@techhive.com"
              className="text-yellow-400 hover:text-yellow-300 underline transition"
            >
              support@techhive.com
            </a>
          </p>
          <p className="mt-2">Phone: +1 (555) 123-4567</p>
          <p className="mt-2">Address: 123 TechHive Lane, Silicon Valley, CA</p>
        </div>
      </div>
    </section>

  );
}

export default Contact;
