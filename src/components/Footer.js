import React from "react";
import facebookIcon from '../assets/face.png';
import whatsappIcon from '../assets/whatsapp.jpg'; 
import instagramIcon from '../assets/instagram.png'; 
import twitterIcon from '../assets/twitter.png'; 

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-8">
     
      <div className="text-center mb-6">
        <p className="text-lg font-extrabold">For Contact</p>
        <p className="text-md mt-2 font-semibold">Mobile : +971 543943155 </p>
        <p className="text-md mt-1 font-semibold">
  Email: <a href="mailto:info.4digit@gmail.com" className="text-white hover:text-blue-500 hover:underline">info.4digit@gmail.com</a>
</p>

      </div>

      
      <div className="max-w-7xl mx-auto flex justify-center space-x-8">
       
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img
            src={facebookIcon}
            alt="Facebook"
            className="w-10 h-10 object-contain hover:opacity-80 transition-all"
          />
        </a>
        
        
        <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
          <img
            src={whatsappIcon}
            alt="WhatsApp"
            className="w-10 h-10 object-contain hover:opacity-80 transition-all"
          />
        </a>
        
      
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img
            src={instagramIcon}
            alt="Instagram"
            className="w-10 h-10 object-contain hover:opacity-80 transition-all"
          />
        </a>
        

        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src={twitterIcon}
            alt="Twitter"
            className="w-10 h-10 object-contain hover:opacity-80 transition-all"
          />
        </a>
      </div>

      <p className="text-center text-sm mt-4">
        &copy; {new Date().getFullYear()} Your Website. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
