import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useMoods() {
  const [moodItems, setMoodsItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getMoodsFromApi() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/moods/readal`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const moods = await data.json();
      console.log("moods =", moods);
      setMoodsItems(moods);
    }

    if (accessToken) {
      getMoodsFromApi();
    }
  }, [accessToken]);

  return [moodItems, setMoodsItems];
}
