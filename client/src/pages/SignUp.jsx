import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      {" "}
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="username"
            className="border p-3 rounded-lg"
            id="username"
          />
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
          />
          <input
            type="password"
            placeholder="confirm password"
            className="border p-3 rounded-lg"
            id="confirmPassword"
          />

          <button className="bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            SIGN UP
          </button>
        </form>
        <div className="flex gap-2 mt-5">
          <p>Already have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
