import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";
// import useUser from "../hooks/useUser";

export default function Profile() {
  const { user } = useAuth0();

  return (
    <div>
      <div>
        <img src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" 
        width="99" alt="profile avatar" />
      </div>
      <div>
        <p>Name: {user.name}</p>
      </div>
      <div>
        <p>Email: {user.email}</p>
      </div>
      {/* <div>
        <p>Auth0Id: {user.sub}</p>
      </div> */}
      <div>
        <p>Email verified: {user.email_verified.toString()}</p>
      </div>
      <div>
        <p>Mood </p>
      </div>
      <Link to={`/app/moods`}>
             <button>Im in a new mood</button>
      </Link>
    </div>
  );
}
