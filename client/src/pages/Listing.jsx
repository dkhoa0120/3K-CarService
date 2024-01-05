import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Listing() {
  const [lists, setLists] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  console.log(lists);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/listing/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === false) {
        toast.error(error);
        return;
      }
      setLists((prevLists) =>
        prevLists.filter((listing) => listing._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/user/listing/${currentUser._id}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(error);
        }
        setLists(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser]);

  const navigate = useNavigate();
  return (
    <div className="p-3 max-w-7xl mx-auto">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl text-center font-semibold my-7">
          Your List For Selling - Renting
        </h1>
        <Button onClick={() => navigate("/create-list")}>Add</Button>
      </div>
      {lists.length > 0 ? (
        <>
          {lists.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/list-detail/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                style={{ textDecoration: "none" }}
                className="text-slate-700 font-semibold  truncate flex-1"
                to={`/list-detail/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex item-center">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(listing._id)}
                >
                  Delete
                </Button>
                &nbsp;
                <Link to={`/update-list/${listing._id}`}>
                  <Button variant="success">Edit</Button>
                </Link>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p className="text-xl text-center font-semibold my-7 text-blue-500">
          There are no list{" "}
        </p>
      )}
      <div className="flex justify-center my-7"></div>
    </div>
  );
}
