import { Link } from "react-router-dom";

function About() {
  return (
    <section className="bg-gradient-to-b from-indigo-950 to-gray-900 text-gray-200 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-purple-400 to-indigo-500 mb-6">
          About TechHive
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Welcome to <span className="text-yellow-400 font-semibold">TechHive</span>! We empower businesses with cutting-edge technologies, seamless user experiences, and innovative designs to shape the future of e-commerce and digital solutions.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="bg-indigo-800/40 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Innovative Design
          </h3>
          <p className="text-indigo-100">
            Our team crafts stunning, user-centric designs that leave a lasting impression and enhance brand visibility.
          </p>
        </div>
        <div className="bg-indigo-800/40 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Seamless Integration
          </h3>
          <p className="text-indigo-100">
            We ensure effortless integration of the latest tools and platforms to optimize your workflow and boost productivity.
          </p>
        </div>
        <div className="bg-indigo-800/40 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-yellow-400/30 transition duration-300">
          <h3 className="text-2xl font-bold text-yellow-400 mb-4">
            Dedicated Support
          </h3>
          <p className="text-indigo-100">
            Our friendly and proactive support team is ready to assist you at every step, ensuring smooth operations.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-20">
        <p className="text-center text-lg text-indigo-200">
          Interested in collaborating with us?{" "}
          <Link to="/contact" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition">
            Contact us today
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default About;

