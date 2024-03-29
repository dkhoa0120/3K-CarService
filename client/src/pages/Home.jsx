import React, { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Item from "../components/Item";
import { Button } from "react-bootstrap";
function Home() {
  const [offerLists, setOfferLists] = useState([]);
  const [rentLists, setRentLists] = useState([]);
  const [sellLists, setSellLists] = useState([]);

  useEffect(() => {
    const fetchOffer = async () => {
      const res = await fetch("/api/listing/get?offer=true&limit=3", {
        method: "GET",
      });
      const data = await res.json();
      setOfferLists(data);
    };
    const fetchRent = async () => {
      const res = await fetch("/api/listing/get?type=Rent&limit=3", {
        method: "GET",
      });
      const data = await res.json();
      setRentLists(data);
    };
    const fetchSell = async () => {
      const res = await fetch("/api/listing/get?type=Sell&limit=3", {
        method: "GET",
      });
      const data = await res.json();
      setSellLists(data);
    };
    fetchSell();
    fetchOffer();
    fetchRent();
  }, []);

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
          <Link to={"/search"} style={{ textDecoration: "none" }}>
            <div className="button"> Explore More ...</div>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center my-5 text-blue-900">
        <h1 className="font-bold">Car You May Like</h1>
      </div>

      <div className="max-w-6xl mx-auto p-4 flex flex-col gap-10 my-10">
        {offerLists && offerLists.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerLists.map((listing) => (
                <Item listing={listing} key={listing._id} />
              ))}
            </div>
            <div className="flex justify-end p-3">
              <Link to={"/search?offer=true"}>
                <Button>Show more</Button>
              </Link>
            </div>
          </div>
        )}
        {rentLists && rentLists.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent cars for rent
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentLists.map((listing) => (
                <Item listing={listing} key={listing._id} />
              ))}
            </div>
            <div className="flex justify-end p-3">
              <Link to={"/search?type=Rent"}>
                <Button>Show more</Button>
              </Link>
            </div>
          </div>
        )}
        {sellLists && sellLists.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent cars for sell
              </h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {sellLists.map((listing) => (
                <Item listing={listing} key={listing._id} />
              ))}
            </div>
            <div className="flex justify-end p-3">
              <Link to={"/search?type=Sell"}>
                <Button>Show more</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center items-center my-5 text-blue-900">
        <h1 className="font-bold">Explore Top Trend</h1>
      </div>
      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-4 my-10">
        <div className="bg-[url(/img/Electric.jpg)] bg-cover h-[300px] w-[326px] relative">
          <div className="absolute bottom-0 px-4 py-3 bg-gray-500/50 w-full">
            <h1 className="text-white font-semibold text-4xl cursor-pointer">
              Electric Car
            </h1>
            <p className="text-gray-200">
              An electric car or electric vehicle (EV) is a passenger automobile
              that is propelled by an electric traction motor.
            </p>
          </div>
        </div>
        <div className="col-span-2 ">
          <h3 className="font-bold">Do You Know What?</h3>
          <p className="text-slate-700 font-semibold">
            🌿 Drive Towards a Greener Tomorrow:{" "}
          </p>{" "}
          <p>
            Make a powerful impact on the environment by choosing the
            eco-friendly option. Our electric car is powered by clean energy,
            reducing your carbon footprint and contributing to a healthier
            planet.
          </p>
          <p className="text-slate-700 font-semibold">
            {" "}
            ⚡ Unleash the Power of Efficiency:
          </p>
          <p>
            Experience a new level of efficiency with instant torque and smooth
            acceleration. Our cutting-edge electric technology not only provides
            a thrilling driving experience but also ensures you reach your
            destination faster and smarter.
          </p>
          <div className="flex justify-end pr-6">
            <Link to={"/search?fuel=Electric"}>
              <Button variant="success">Explore</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          Why Choosing Us
        </h1>
        <p className="mb-4 text-slate-700">
          3KCarService stands out as a premier online destination dedicated to
          facilitating clients in their car rental and purchase endeavors.
          Specializing in connecting individuals with top-notch vehicles, our
          platform offers a seamless experience for those looking to rent or buy
          cars.
        </p>
        <p className="mb-4 text-slate-700">
          Our primary goal is to empower clients in realizing their automotive
          aspirations by providing expert guidance, personalized support, and an
          in-depth understanding of the local car market. Whether you're in the
          market for a temporary ride or a permanent purchase, we're here to
          assist you throughout the entire process.
        </p>
        <p className="mb-4 text-slate-700">
          Backed by a team of seasoned professionals with extensive experience
          in the automotive industry, we are committed to delivering the highest
          level of service to our clients. We firmly believe that the journey of
          renting or buying a car should be a thrilling and satisfying
          experience, and we are devoted to bringing that vision to life for
          each client we serve.
        </p>
      </div>
    </div>
  );
}

export default Home;
