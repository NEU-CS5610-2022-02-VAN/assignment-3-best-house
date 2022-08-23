import React, {useState} from "react";
import useProperties from "../hooks/useProperties";
import { useAuthToken } from "../AuthTokenContext";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";


export default function EditProperties() {
    const [newItemText, setNewItemText] = useState({}); // the state that store once input
    const [propertiesItems, setPropertiesItems] = useProperties(); // array that store all items
    const { accessToken } = useAuthToken();

    let { propertyId } = useParams();
    console.log(propertyId)

    async function getOldProperty() {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/properties/find/${propertyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        });
        if (data.ok) {
          const property = await data.json();
          console.log("old prop = ", property);
          setNewItemText(property);
          return property;
        } else {
          return null;
        }
    }

    async function updateProperty(object) {
        const data = await fetch(`${process.env.REACT_APP_API_URL}/properties/update/${propertyId}`, {
          method: "PUT",
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
          return property;
          //show succeed prompt
        } else {
          return null;
          //show failed prompt
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

        const newProp = await updateProperty(newItemText);
        console.log("state NIT=", newItemText);
        console.log("newProp=", newProp);
        if (newProp) {
            setPropertiesItems([...propertiesItems, newProp]);
            setNewItemText("");
            e.target.reset();
        }
    };

    useEffect(() => {getOldProperty()}, []);

    return (
      <div className="updateBox">
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
      
      <Link to={`/app/properties`}>
        <h3 className="button-form">Back</h3>
      </Link>
      </form>
      </div>
    );
}

