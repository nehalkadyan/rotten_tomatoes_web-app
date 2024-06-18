// Import necessary modules
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter, FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";

// Footer component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container flex justify-around mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Help Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="font-semibold text-lg mb-4">Help</h2>
            <ul>
              <li className="mb-2">
                <button className="hover:underline focus:outline-none">
                  About Rotten Tomatoes
                </button>
              </li>
              <li className="mb-2">
                <button className="hover:underline focus:outline-none">
                  What's the Tomatometer®?
                </button>
              </li>
              <li className="mb-2">
                <button className="hover:underline focus:outline-none">
                  Critic Submission
                </button>
              </li>
              <li className="mb-2">
                <button className="hover:underline focus:outline-none">
                  Licensing
                </button>
              </li>
              <li className="mb-2">
                <button className="hover:underline focus:outline-none">
                  Advertise With Us
                </button>
              </li>
              <li>
                <button className="hover:underline focus:outline-none">
                  Careers
                </button>
              </li>
            </ul>
          </div>
          {/* Newsletter Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="font-semibold text-lg mb-4">JOIN THE NEWSLETTER</h2>
            <p className="mb-4">
              Get the freshest reviews, news, and more delivered right to your
              inbox!
            </p>
            <form className="flex">
              <input
                type="email"
                className="p-2 flex-grow rounded-l-lg text-gray-900"
                placeholder="Your email"
              />
              <button
                type="submit"
                className="bg-red-600 text-white p-2 rounded-r-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
          {/* Follow Us Section */}
          <div className="w-full md:w-1/4 mb-6">
            <h2 className="font-semibold text-lg mb-4">FOLLOW US</h2>
            <div className="flex space-x-4">
              <button className="hover:text-red-600 focus:outline-none">
                <FaFacebook />
              </button>
              <button className="hover:text-red-600 focus:outline-none">
                <FaTwitter />
              </button>
              <button className="hover:text-red-600 focus:outline-none">
                <FaInstagram />
              </button>
              <button className="hover:text-red-600 focus:outline-none">
                <FaYoutube />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export component
export default Footer;
