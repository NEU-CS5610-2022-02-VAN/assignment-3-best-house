import React, { useState, useEffect} from "react";
import useProperties from "../hooks/useProperties";
import { useAuthToken } from "../AuthTokenContext";
// import "../style/todoList.css";
import { Link } from "react-router-dom";

export default function HandleProperties() {
  const [newItemText, setNewItemText] = useState({}); // the state that store once input
  const [propertiesItems, setPropertiesItems] = useProperties(); // array that store all items
  const { accessToken } = useAuthToken();

  useEffect(() => { setNewItemText({["owner"]: "Anonymous"}) }, []);

  //write
  async function insertProperty(object) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/properties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        owner: object.owner,
        address: object.address,
        location: object.location,
        status: object.status,
        type: object.type,
        price: parseInt(object.price),
        picture: object.picture
      }),
    });
    if (data.ok) {
      const property = await data.json();
      console.log("add prop = ", property);
      console.log("propertiesItems = ", propertiesItems);
      return property;
    } else {
      return null; //error handling here: 
      //1. address are the same 
      //2. after a bad address input, clean all 

      // pic url too long

      // clean all after a bad input
      // input should be a new event
      //clean all input!!!!!!!!!
    }
  }

  const handleChange = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setNewItemText(values => ({...values, [name]: value}))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newItemText) return;

    const newProp = await insertProperty(newItemText);
    console.log("state NIT=", newItemText);
    console.log("newProp=", newProp);
    if (newProp) {
      setPropertiesItems([...propertiesItems, newProp]);
      setNewItemText({["owner"]: "Anonymous"});
      e.target.reset();
    }
  };


  //delete
  async function deleteProperty(id) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/properties`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        id: parseInt(id)
      }),
    });
    if (data.ok) {
      const property = await data.json();
      console.log("delete prop = ", property);
      console.log("list =", propertiesItems);
      console.log("current id=", id);
      setPropertiesItems(current => current.filter(item => {return item.id !== property.id}));
      console.log("after list =", propertiesItems);
      return property;
    } else {
      return null;
    }
  }

  //update
  //see PropertyUpdate page


  return (
    <div className="property-list">
      <form 
        onSubmit={(e) => handleFormSubmit(e)}
        className="property-form"
        autoComplete="off"
      >
           {/* address */}
        <label className="txt">address(unique):
            <br></br>
            <input required={true}
              type="text"
              name="address"
              id="address"
              value={newItemText.address}
              onChange={handleChange}
            />
          </label>
        {/* owner */}
        <label className="txt">owner:
          <br></br>
          <input required={true}
            type="text"
            name="owner"
            id="owner"
            value={newItemText.owner}
            onChange={handleChange}
          />
        </label>
        {/* location */}
        <label className="txt">location:
          <br></br>
          <input required={true}
            type="text"
            name="location"
            id="location"
            value={newItemText.location}
            onChange={handleChange}
          />
        </label>
        {/* Status */}
        <label className="txt">Status:
        <br></br>
          <select value={newItemText.status} onChange={handleChange} 
          name ="status" id="status" required={true}>
            <option value=""></option>
            <option value="PENDING">Pending</option>
            <option value="TRANSCATION">Transaction</option>
            <option value="CLOSED">Closed</option>
          </select>
        </label>
        {/* type */}
        <label className="txt">Type:
        <br></br>
          <select value={newItemText.type} onChange={handleChange} 
          name ="type" id="type" required={true}>
            <option value=""></option>
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">Home</option>
            <option value="TOWNHOUSE">Townhouse</option>
            <option value="CONDO">Condon</option>
          </select>
        </label>
        {/* Price */}
        <label className="txt">Price:
        <br></br>
          <input required={true}
            type="number"
            name="price"
            id="price"
            value={newItemText.price}
            onChange={handleChange}
          />
        </label>
        {/* Picture */}
        <label className="txt">Picture URL:
        <br></br>
          <input required={true}
            type="text"
            name="picture"
            id="picture"
            value={newItemText.picture}
            onChange={handleChange}
          />
        </label>
        <button className="button-form" type="submit">Add Property</button>
      </form>

      <ul className="prop-list box-prop">
        {propertiesItems.map((item) => {
          return (
            <div key={item.id} className="prop-item" >
              <h5 className="itemAddress">owner = {item.owner}</h5>
              <h5 className="itemAddress">address = {item.address}</h5>
              <h5 className="itemAddress">location = {item.location}</h5>
              <h5 className="itemAddress">status = {item.status}</h5>
              <h5 className="itemPrice">price = {item.price}</h5>
              <h5 className="itemType">type = {item.type}</h5>
              <br></br>
              <button className="btn-danger" value={item.id} onClick={e => deleteProperty(e.target.value)}>X</button>
              <Link to={`/app/properties/update/${parseInt(item.id)}`} >
                <button className="btn-hipster" type="button" value={item.id}>
                    Edit
                </button>
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
}
