import React from "react";

function Contact() {
  return (
    <section className="bg-gray-900 text-gray-200 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-blue-500 mb-4">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">
            Got a question or need help? We’d love to hear from you. Reach out to us anytime!
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8 shadow-lg">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-gray-400 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="w-full mt-2 px-4 py-2 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-400 font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full mt-2 px-4 py-2 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-gray-400 font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message"
                className="w-full mt-2 px-4 py-2 bg-gray-900 text-gray-200 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center text-gray-400">
          <p className="text-lg">You can also reach us at:</p>
          <p className="mt-2">
            <a
              href="mailto:support@techhive.com"
              className="text-blue-400 hover:text-blue-500 underline"
            >
              support@techhive.com
            </a>
          </p>
          <p className="mt-1">Phone: +1 (555) 123-4567</p>
          <p className="mt-1">Address: 123 TechHive Lane, Silicon Valley, CA</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
