import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function CreateListing() {
  const [imgProgress, setImgProgress] = useState(0);
  const [offer, setOffer] = useState(false);
  const [insurance, setInsurance] = useState(false);
  const [type, setType] = useState("Sell");
  const [transmission, setTransmission] = useState("Manual");
  const [fuel, setFuel] = useState("Oil");
  const [imageUrls, setImageUrls] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [seats, setSeats] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [file, setFile] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleImageSubmit = (e) => {
    if (file.length > 0 && file.length + imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < file.length; i++) {
        promises.push(storeImage(file[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setImageUrls([...imageUrls, ...urls]);
        })
        .catch((err) => {
          toast.error("Image upload failed (2 mb max per image)");
        });
    } else {
      toast.error("You can only upload 6 images per listing");
    }
  };

  console.log("phone", phone);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgProgress(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImg = (index) => {
    setImageUrls((imageUrls) => imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (imageUrls.length < 1) {
      toast.error("You must upload at least one image");
      hasError = true;
    }

    if (+regularPrice < +discountPrice) {
      toast.error("Discount price must be lower than regular price");
      hasError = true;
    }

    if (phone.length < 7) {
      toast.error("Please input your phone number");
      hasError = true;
    }

    if (hasError) {
      return;
    } else {
      const formData = {
        name,
        contact,
        description,
        address,
        regularPrice,
        discountPrice: discountPrice || 0,
        seats,
        phone,
        type,
        transmission,
        fuel,
        offer,
        insurance,
        imageUrls,
        userRef: currentUser._id,
      };
      try {
        const res = await fetch("/api/listing/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
        } else {
          navigate(`/list-detail/${data._id}`);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  return (
    <div>
      <form className="p-3 max-w-7xl mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-3xl text-center font-semibold my-7">
          Post A New Car
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="7"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="email"
              placeholder="Contact Mail"
              className="border p-3 rounded-lg"
              id="contact"
              maxLength="62"
              minLength="10"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <textarea
              type="text"
              placeholder="Description"
              className="border p-3 rounded-lg"
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <span>Type:</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  checked={type === "Sell"}
                  onChange={() => setType("Sell")}
                />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  checked={type === "Rent"}
                  onChange={() => setType("Rent")}
                />
                <span>Rent</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <span>Fuel:</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="oil"
                  className="w-5"
                  checked={fuel === "Oil"}
                  onChange={() => setFuel("Oil")}
                />
                <span>Oil</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="gas"
                  className="w-5"
                  checked={fuel === "Gas"}
                  onChange={() => setFuel("Gas")}
                />
                <span>Gas</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="electric"
                  className="w-5"
                  checked={fuel === "Electric"}
                  onChange={() => setFuel("Electric")}
                />
                <span>Electric</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <span>Transmission:</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="manual"
                  className="w-5"
                  checked={transmission === "Manual"}
                  onChange={() => setTransmission("Manual")}
                />
                <span>Manual</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="auto"
                  className="w-5"
                  checked={transmission === "Automatic"}
                  onChange={() => setTransmission("Automatic")}
                />
                <span>Automatic</span>
              </div>
            </div>
            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2">
                <span>Other:</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  checked={offer}
                  onChange={() => setOffer(!offer)}
                />
                <span>Offer</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="insurance"
                  className="w-5"
                  checked={insurance}
                  onChange={() => setInsurance(!insurance)}
                />
                <span>Insurance</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <p>Seats:</p>
              <input
                type="number"
                id="seats"
                min="1"
                max="16"
                required
                className="p-1 border border-gray-300 rounded-lg"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                {type === "Rent" && <span className="text-xs">($ / day)</span>}
              </div>
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-1 border border-gray-300 rounded-lg"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
              />
            </div>
            {offer && (
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <p>Discounted price</p>
                  {type === "Rent" && (
                    <span className="text-xs">($ / day)</span>
                  )}
                </div>
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  required
                  className="p-1 border border-gray-300 rounded-lg"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <PhoneInput
              placeholder="Enter phone number"
              value={phone}
              required
              onChange={setPhone}
            />
            <p className="font-semibold text-red-600">
              Phone Number:
              <span className="font-normal">
                You will can not change your phone number later
              </span>
            </p>
            <div className="flex gap-4">
              <input
                className="p-3 border border-gray-300 rounded w-full"
                type="file"
                id="images"
                accept="image/*"
                onChange={(e) => setFile(e.target.files)}
                multiple
              />
              <button
                type="button"
                onClick={handleImageSubmit}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {imgProgress > 0 && imgProgress < 100 ? (
                  <span className="text-slate-700">{`Uploading ${imgProgress}%`}</span>
                ) : (
                  <span className="text-green-700">Upload</span>
                )}
              </button>
            </div>
            <p className="font-semibold text-red-600">
              Images:
              <span className="font-normal ">
                The first image will be the cover (max 6)
              </span>
            </p>
            {imageUrls.length > 0 &&
              imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border items-center"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                    onClick={() => handleRemoveImg(index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-center my-7">
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-center w-80">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
