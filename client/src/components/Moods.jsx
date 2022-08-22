import React, { useState} from "react";
import useMoods from "../hooks/useMoods";
import { useAuthToken } from "../AuthTokenContext";

export default function Mood() {
  const [newMoodTxt, setNewMoodTxt] = useState({}); // the state that store once input
  const [moodItems, setMoodsItems] = useMoods(); //all moods array
  const { accessToken } = useAuthToken();
    //show all mood 

    //add new mood

    //*show latest mood
    
    console.log("mood items=", moodItems);

  //write
  async function insertMood(object) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/moods/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        mood: object.mood
      }),
    });
    if (data.ok) {
      const newMoood = await data.json();
      console.log("add mood = ", newMoood);
      console.log("propertiesItems = ", moodItems);
      return newMoood;
    } else {
      return null; 
      //prompt failed
    }
  }

  const handleChange = (event) => {
    console.log(event.target.name);
    const name = event.target.name;
    const value = event.target.value;
    setNewMoodTxt(values => ({...values, [name]: value}))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newMoodTxt) return;

    const newM = await insertMood(newMoodTxt);
    console.log("state NIT=", newMoodTxt);
    console.log("newProp=", newM);
    if (newM) {
      setMoodsItems([...moodItems, newM]);
      setNewMoodTxt("");
      e.target.reset();
    }
  };



  return (
    <div>
      <ul className="list">
          {moodItems.map((item) => {
            return (
              <div key={item.id} className="mood-item" >
                <span className="mood">{item.mood}   ||</span>
                <span className="createtime">{item.createdAt}   ||</span>
              </div>
            );
          })}
      </ul>
      <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="mood-form"
          autoComplete="off"
        >
          {/* address */}
          <label>new mood:
            <input required={true}
              type="text"
              name="mood"
              id="mood"
              value={newMoodTxt.mood}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Property</button>
        </form>
    </div>
  )
}