import React from "react";
import "../App.css";
function Home() {
  return (
    <div>
      <div className="bg-gradient-to-tl from-slate-900 to-slate-500 h-96 w-full relative">
        <img
          src="/img/cover.jpg"
          className="w-full h-full object-cover absolute mix-blend-overlay"
          alt="cover"
        />
        <div className="flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto">
          <h1 className="text-white font-bold text-3xl lg:text-6xl">
            Enhance Your Holiday Experience
          </h1>
          <h2 className="text-white text-xs sm:text-sm">
            We will help you to find your favorite car for your family and bring
            comfortable to your journey! Easy to connect between car's owner and
            customers!
          </h2>
          <div className="button">Explore More ...</div>
        </div>
      </div>
      <h1>Home</h1>
      <p>Hello</p>
    </div>
  );
}

export default Home;
