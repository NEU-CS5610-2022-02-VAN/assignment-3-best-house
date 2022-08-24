import React, { useState, useEffect} from "react";
import useMoods from "../hooks/useMoods";
import { useAuthToken } from "../AuthTokenContext";
import { Link } from "react-router-dom";

export default function Mood() {
  const [newMoodTxt, setNewMoodTxt] = useState({}); // the state that store once input
  const [moodItems, setMoodsItems] = useMoods(); //all moods array
  const { accessToken } = useAuthToken();

  
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
      return newMoood;
    } else {
      return null; 
      //prompt failed
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewMoodTxt(values => ({...values, [name]: value}))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!newMoodTxt) return;

    const newM = await insertMood(newMoodTxt);
    if (newM) {
      setMoodsItems([...moodItems, newM]);
      setNewMoodTxt("");
      e.target.reset();
    }
  };

  return (
    <div>
      <ul className="mood-list txt">
          {moodItems.map((item) => {
            const moodString = item.mood + " // " + item.createdAt;
            return (
              <div key={item.id} className="mood-item" >
                <h5 className="mood">{moodString}</h5>
                {/* <h5 className="mood-createtime">{item.createdAt}</h5> */}
                <br></br>
              </div>
            );
          })}
      </ul>

      <form
          onSubmit={(e) => handleFormSubmit(e)}
          className="mood-form"
          autoComplete="off"
        >
          <label>new mood:
            <input required={true}
              type="text"
              name="mood"
              id="mood"
              value={newMoodTxt.mood}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Add Mood</button>
      <Link to={`/app`}>
        <button>Back</button>
      </Link>
      </form>
    </div>
  )
}