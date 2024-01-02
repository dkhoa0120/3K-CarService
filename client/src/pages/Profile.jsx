import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        {/* <input
      onChange={(e) => setFile(e.target.files[0])}
      type='file'
      ref={fileRef}
      hidden
      accept='image/*'
    /> */}
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {/* <p className='text-sm self-center'>
      {fileUploadError ? (
        <span className='text-red-700'>
          Error Image upload (image must be less than 2 mb)
        </span>
      ) : filePerc > 0 && filePerc < 100 ? (
        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
      ) : filePerc === 100 ? (
        <span className='text-green-700'>Image successfully uploaded!</span>
      ) : (
        ''
      )}
    </p> */}
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
      </div>

      <button className="text-green-700 w-full">Show Listings</button>
      {/* <p className='text-red-700 mt-5'>
    {showListingsError ? 'Error showing listings' : ''}
  </p>

  {userListings && userListings.length > 0 && (
    <div className='flex flex-col gap-4'>
      <h1 className='text-center mt-7 text-2xl font-semibold'>
        Your Listings
      </h1>
      {userListings.map((listing) => (
        <div
          key={listing._id}
          className='border rounded-lg p-3 flex justify-between items-center gap-4'
        >
          <Link to={`/listing/${listing._id}`}>
            <img
              src={listing.imageUrls[0]}
              alt='listing cover'
              className='h-16 w-16 object-contain'
            />
          </Link>
          <Link
            className='text-slate-700 font-semibold  hover:underline truncate flex-1'
            to={`/listing/${listing._id}`}
          >
            <p>{listing.name}</p>
          </Link>

          <div className='flex flex-col item-center'>
            <button
              onClick={() => handleListingDelete(listing._id)}
              className='text-red-700 uppercase'
            >
              Delete
            </button>
            <Link to={`/update-listing/${listing._id}`}>
              <button className='text-green-700 uppercase'>Edit</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )} */}
    </div>
  );
}

export default Profile;
