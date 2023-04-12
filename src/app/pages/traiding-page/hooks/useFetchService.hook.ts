import { useState, useEffect } from 'react';

export const useFetchService = (link:string):any[]|null => {
  const [serverData, setServerData] = useState(null);
  useEffect(() => {
    fetch(link)
      .then((response) => response.json())
      .then((json) => setServerData(json))
      .catch(() => console.log('Данные не получены'));
  }, []);
  return serverData;
};