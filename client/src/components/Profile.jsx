import React, {useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth0();
  const [latest, setLatest] =useState([]);
  const { accessToken } = useAuthToken();


  useEffect(() => {

    fetch(`${process.env.REACT_APP_API_URL}/moods/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(response =>{
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      setLatest(data);
    })
  }, [accessToken]); 



  return (
    <div className="profileBox">
      <div>
        <img src="https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?k=20&m=522855255&s=612x612&w=0&h=fLLvwEbgOmSzk1_jQ0MgDATEVcVOh_kqEe0rqi7aM5A=" 
        width="99" alt="profile avatar" className="box2" />
      </div>
      <div>
        <h5 className='title'>Name: {user.name}</h5>
      </div>
      <div>
        <h5 className='title'>Email: {user.email}</h5>
      </div>
      <div>
        <h5 className='title'>Email verified: {user.email_verified.toString()}</h5>
      </div>
      <div> 
       {latest.map((item) => {
            return (
                <h5 key={item.id} className="mood title"> Mood: {item.mood}</h5>
            );
          })}
      </div>
      <Link to={`/app/moods`}>
             <button className='box5'>Im in a new mood</button>
      </Link>
    </div>
  );
}
