import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import mainpaper from "./yyds-wallpaper.jpg"


function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const signUp = () => loginWithRedirect({ screen_hint: "signup" });
  const [allProps, setAllProps] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/properties/readal`)
    .then(response =>{
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      setAllProps(data);
    })
  }, []);  


      
  return (
    <div>

      <div className="home">
        <h1 className='title'>Best House</h1>
        <img alt="wallpaper of vancouver" className="wallpaper" src={mainpaper}/>        
      </div>

        <div>
          <div>
            {!isAuthenticated ? (
              <button className="btn btn-hero box3" onClick={loginWithRedirect}>
                Login      
              </button>
            ) : (
              <button className="btn btn-hero box3" onClick={() => navigate("/app")}>
                Enter App   
              </button>
            )}
          </div>
          <div>
            <button className="btn btn-hero box4" onClick={signUp}>
              Create Account
            </button>
          </div>
        </div>

        <br>
        </br>
        <br>
        </br>

        <h3 className='subtitle'>house list</h3>
        <div className='box'>
          {allProps.map((item) => (
           <div key={item.id} className="box1-5"> 
              <Link to = {`/${parseInt(item.id)}`} > 
                <img  src={item.picture} alt="" className='box2' />
              </Link> 
              <h3>{item.address}</h3>
              <h3 >{item.price} CAD</h3> 
           </div>
          ))}
        </div>
    </div>
  )
}

export default Landing

