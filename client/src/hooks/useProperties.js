import { useState, useEffect } from "react";
import { useAuthToken } from "../AuthTokenContext";

export default function useProperties() {
  const [propertiesItems, setPropertiesItems] = useState([]);
  const { accessToken } = useAuthToken();

  useEffect(() => {
    async function getPropsFromApi() {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/properties`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const props = await data.json();

      setPropertiesItems(props);
    }

    if (accessToken) {
      getPropsFromApi();
    }
  }, [accessToken]);

  return [propertiesItems, setPropertiesItems];
}
