import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [message, setMessage] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {currentUser && (
        <div className="flex flex-col gap-2">
          <p>
            Contact{" "}
            <span className="font-semibold">{currentUser.username}</span> for{" "}
            <span className="font-semibold">
              {listing.name.toLowerCase()} owner
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            style={{ textDecoration: "none" }}
            to={`mailto:${listing.contact}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-blue-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
