import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";

export default function Search() {
  const [type, setType] = useState("All");
  const [transmission, setTransmission] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [offer, setOffer] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const typeFromUrl = urlParams.get("type");
    const transmissionFromUrl = urlParams.get("transmission");
    const fuelFromUrl = urlParams.get("fuel");
    const insuranceFromUrl = urlParams.get("insurance");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      transmissionFromUrl ||
      typeFromUrl ||
      fuelFromUrl ||
      insuranceFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setType(typeFromUrl || "All");
      setTransmission(transmissionFromUrl || "All");
      setFuel(fuelFromUrl || "All");
      setInsurance(insuranceFromUrl === "true" ? true : false);
      setOffer(offerFromUrl === "true" ? true : false);
      setSort(sortFromUrl || "created_at");
      setOrder(orderFromUrl || "desc");
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("type", type);
    urlParams.set("fuel", fuel);
    urlParams.set("transmission", transmission);
    urlParams.set("insurance", insurance);
    urlParams.set("offer", offer);
    urlParams.set("sort", sort);
    urlParams.set("order", order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleSort = (e) => {
    e.preventDefault();
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setSort(sort);
      setOrder(order);
    }
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="p-4 sm:p-0 mx-auto">
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div className="flex flex-col gap-4 md:w-1/4 md:min-h-screen md:border-r-2">
          <h1 className="text-3xl font-semibold border-b text-slate-700 ">
            Filter by:
          </h1>
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={() => setType("All")}
                  checked={type === "All"}
                />
                <span>All</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={() => setType("Rent")}
                  checked={type === "Rent"}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5"
                  onChange={() => setType("Sell")}
                  checked={type === "Sell"}
                />
                <span>Sell</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Transmission:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={() => setTransmission("All")}
                  checked={transmission === "All"}
                />
                <span>All</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="auto"
                  className="w-5"
                  onChange={() => setTransmission("Automatic")}
                  checked={transmission === "Automatic"}
                />
                <span>Automatic</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  onChange={() => setTransmission("Manual")}
                  checked={transmission === "Manual"}
                />
                <span>Manual</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Fuel:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="all"
                  className="w-5"
                  onChange={() => setFuel("All")}
                  checked={fuel === "All"}
                />
                <span>All</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="oil"
                  className="w-5"
                  onChange={() => setFuel("Oil")}
                  checked={fuel === "Oil"}
                />
                <span>Oil</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="gas"
                  className="w-5"
                  onChange={() => setFuel("Gas")}
                  checked={fuel === "Gas"}
                />
                <span>Gas</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="electric"
                  className="w-5"
                  onChange={() => setFuel("Electric")}
                  checked={fuel === "Electric"}
                />
                <span>Electric</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-center">
              <label className="font-semibold">Other:</label>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={() => setOffer(!offer)}
                  checked={offer === true}
                />
                <span>Offer</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="insurance"
                  className="w-5"
                  onChange={() => setInsurance(!insurance)}
                  checked={insurance === true}
                />
                <span>Insurance</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <label className="font-semibold">Sort:</label>
              <select
                defaultValue={"created_at_desc"}
                id="sort_order"
                className="border rounded-lg p-3"
                onChange={handleSort}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to hight</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
              Apply Filter
            </button>
          </form>
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-3/4">
          <h1 className="text-3xl font-semibold border-b  text-slate-700 ">
            Listing results:
          </h1>
          <div className="p-1 flex flex-wrap gap-4">
            {!loading && listings.length === 0 && (
              <p className="text-xl text-slate-700">No listing found!</p>
            )}
            {loading && (
              <p className="text-xl text-slate-700 text-center w-full">
                Loading...
              </p>
            )}

            {!loading &&
              listings &&
              listings.map((listing) => (
                <Item key={listing._id} listing={listing} />
              ))}

            {showMore && (
              <button
                onClick={onShowMoreClick}
                className="text-green-700 hover:underline p-7 text-center w-full"
              >
                Show more
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
