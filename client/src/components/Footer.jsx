import React from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaDribbble } from "react-icons/fa";
export default function Footer() {
  return (
    <div>
      <footer className="bg-white">
        <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
          <nav className="flex flex-wrap justify-center -mx-5 -my-2">
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                About
              </a>
            </div>
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Blog
              </a>
            </div>
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Team
              </a>
            </div>
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Pricing
              </a>
            </div>
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Contact
              </a>
            </div>
            <div className="px-5 py-2">
              <a className="text-base leading-6 text-gray-500 hover:text-gray-900">
                Terms
              </a>
            </div>
          </nav>
          <div className="flex justify-center mt-8 space-x-6">
            <a className="text-gray-400 hover:text-gray-500 text-2xl">
              <FaFacebook />
            </a>
            <a className="text-gray-400 hover:text-gray-500 text-2xl">
              <FaInstagram />
            </a>
            <a className="text-gray-400 hover:text-gray-500 text-2xl">
              <FaSquareXTwitter />
            </a>
            <a className="text-gray-400 hover:text-gray-500 text-2xl">
              <FaGithub />
            </a>
            <a className="text-gray-400 hover:text-gray-500 text-2xl">
              <FaDribbble />
            </a>
          </div>
          <p className="mt-8 text-base leading-6 text-center text-gray-400">
            © 2024 3KCarService, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
