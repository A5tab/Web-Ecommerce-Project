import React from "react";

function About() {
  return (
    <section className="bg-gray-900 text-gray-200 py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl text-blue-500 mb-4">
          About Us
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
          Welcome to TechHive! We are dedicated to providing the best solutions for your e-commerce and technology needs. Our mission is to empower businesses with cutting-edge technology, seamless user experiences, and innovative designs.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Innovative Design
          </h3>
          <p className="text-gray-300">
            Our team specializes in crafting user-friendly and visually stunning designs to help your brand stand out.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Seamless Integration
          </h3>
          <p className="text-gray-300">
            We offer seamless integration of tools and platforms, making your operations efficient and hassle-free.
          </p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-xl font-semibold text-blue-400 mb-2">
            Customer Support
          </h3>
          <p className="text-gray-300">
            Our support team is always here to help you with any questions or issues you might face.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16">
        <p className="text-center text-lg text-gray-300">
          Want to learn more about what we do?{" "}
          <a href="#" className="text-blue-400 hover:text-blue-500 underline">
            Contact us today
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export default About;
