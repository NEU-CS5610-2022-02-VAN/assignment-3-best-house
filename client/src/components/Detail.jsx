import React, {useState, useEffect} from 'react'
import { Link, useParams } from "react-router-dom";


//<iframe  width="300" height="200" loading="lazy" allowfullscreen 
//src={'https://www.google.com/maps/embed/v1/search?q=' + house.address + '&key=AIzaSyACgHauV5acce3uRscjOfMQU09Eh7PLQRM'}></iframe>
function Detail({house}) {
  let { propId } = useParams();
  const [prop, setProp] = useState([]);

  console.log("the id=", propId);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/properties/find/${propId}`)
    .then(response =>{
      if(response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(data => {
      setProp(data);
    })
  }, []);  

  console.log(prop);

  return (
    <div>
      <h1 className='title'>House Details</h1>
      <div  className='column'>
        <img src={prop.picture} alt="" className='box2' />
        <h3 className='title'>Owner: {prop.owner}</h3>
        <h3 className='title'>Price: {prop.price}</h3>
        <h3 className='title'>Type: {prop.type}</h3>
        <h3 className='title'>Status: {prop.status}</h3>
        <h3 className='title'>location: {prop.location}</h3>
        <h3 className='title'>address: {prop.address}</h3>
      </div>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <br>
      </br>
      <div>
        <iframe width="500" height="450" loading="lazy" allowFullScreen
            src={'https://www.google.com/maps/embed/v1/search?q=' + prop.address + '&key=AIzaSyACgHauV5acce3uRscjOfMQU09Eh7PLQRM'}></iframe>
      </div>

      <Link to={`/`}>
        <button className="btn btn-hero box3">Back</button>
      </Link>
    </div>
  )
}

export default Detail
