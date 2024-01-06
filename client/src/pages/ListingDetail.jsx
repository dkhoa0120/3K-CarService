import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaShieldAlt } from "react-icons/fa";
import { MdOutlineEventSeat } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { BsFuelPump } from "react-icons/bs";
import Contact from "../components/Contact";

export default function ListingDetail() {
  const [listing, setListing] = useState(null);
  const [contact, setContact] = useState(false);
  const navigate = useNavigate();

  console.log("lis", listing);
  const { id } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/listing/get/${id}`, {
          method: "GET",
        });
        const data = await res.json();
        setListing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  console.log(id);
  return (
    <>
      {listing ? (
        <div className="p-3 sm:p-0 max-w-6xl mx-auto">
          <Carousel>
            {listing &&
              listing.imageUrls.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="h-96 w-full object-cover rounded-lg"
                    src={img}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
          </Carousel>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 md:w-3/4">
              <div className="md:flex justify-between">
                <div>
                  <p className="text-5xl font-bold mt-7 ">{listing?.name}</p>
                  <div className="md:flex gap-10">
                    <p className="flex items-center gap-2 text-slate-600  text-sm">
                      <FaMapMarkerAlt className="text-green-700" />
                      {listing.address}
                    </p>
                    <p className="flex items-center gap-2 text-slate-600  text-sm">
                      <FaPhone className="text-green-700" />+ {listing.phone}
                    </p>
                  </div>
                </div>
                {listing?.insurance && (
                  <div className="flex flex-col justify-center items-center text-xl mt-10 p-3 text-green-700 border-solid border-2 border-green-700">
                    <FaShieldAlt /> Insurance
                  </div>
                )}
              </div>

              <hr />
              <div className="flex justify-between">
                <div className="md:flex gap-3 items-center">
                  <MdOutlineEventSeat className="text-blue-500 md:text-4xl text-2xl" />
                  <div>
                    <p className="md:text-xl  text-slate-600 ">Seats</p>
                    <p className="md:text-2xl font-semibold">
                      {listing?.seats}
                    </p>
                  </div>
                </div>
                <div className="md:flex  gap-3 items-center">
                  <TbManualGearbox className="text-blue-500 md:text-4xl text-2xl" />
                  <div>
                    <p className="md:text-xl  text-slate-600 ">Transmission</p>
                    <p className="md:text-2xl font-semibold">
                      {listing?.transmission}
                    </p>
                  </div>
                </div>
                <div className="md:flex gap-3 items-center">
                  <BsFuelPump className="text-blue-500 md:text-4xl text-2xl" />
                  <div>
                    <p className="md:text-xl  text-slate-600 ">Fuel</p>
                    <p className="md:text-2xl font-semibold">{listing?.fuel}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <p className="text-2xl font-semibold">Description:</p>
                <p>{listing?.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-1/4">
              <div className="mt-7 rounded-lg bg-slate-100">
                <div className="p-3 ">
                  <p className="text-3xl font-bold ">For {listing?.type}</p>
                  <p
                    className={
                      listing?.discountPrice > 0
                        ? "text-xl text-slate-500 line-through"
                        : "text-xl font-semibold"
                    }
                  >
                    {listing?.regularPrice.toLocaleString("en-US")} ${" "}
                    {listing?.type === "Rent" && "/ day"}
                  </p>
                  {listing?.discountPrice > 0 && (
                    <p className="text-xl font-semibold text-red-500">
                      {listing?.discountPrice.toLocaleString("en-US")} $
                    </p>
                  )}
                </div>
              </div>
              {!currentUser && (
                <button
                  onClick={() => navigate("/sign-in")}
                  className="bg-green-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                >
                  Contact owner
                </button>
              )}
              {currentUser &&
                listing.userRef !== currentUser._id &&
                !contact && (
                  <button
                    onClick={() => setContact(true)}
                    className="bg-green-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
                  >
                    Contact owner
                  </button>
                )}
              {contact && <Contact listing={listing} />}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-xl text-center font-semibold my-7 text-blue-500">
          Something went wrong!!
        </p>
      )}
    </>
  );
}
