import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function Item({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[340px]">
      <Link
        to={`/list-detail/${listing._id}`}
        style={{ textDecoration: "none" }}
      >
        <img
          src={listing.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex justify-center gap-1">
            <MdLocationOn className="h-6 w-6 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <div className="text-slate-700 justify-between flex gap-4">
            <div className="font-bold text-xs">{listing.seats} seats</div>
            <div className="flex gap-1">
              <p
                className={
                  listing?.discountPrice > 0
                    ? " text-slate-500 line-through"
                    : " font-semibold"
                }
              >
                {listing?.regularPrice.toLocaleString("en-US")} ${" "}
                {listing?.type === "Rent" && "/ day"}
              </p>
              {listing?.discountPrice > 0 && (
                <p className=" font-semibold text-red-500">
                  {listing?.discountPrice.toLocaleString("en-US")} $
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
