import { useEffect, useState } from "react";
import { useApplicationContext } from "../context/DataContext";
import { useUserContext } from "../context/UserContext";
import useAxiosFetch from "../hooks/useAxiosFetch";
import FishCatchCard from "./items/FishCatchCard";

const getTime = () => {
  const now = new Date();
  return {
    day: new Intl.DateTimeFormat("en-us", { weekday: "long" }).format(now),
    date: now.getDate(),
    month: now.getMonth(),
    year: now.getFullYear(),
    seconds: now.getSeconds(),
    minutes: now.getMinutes(),
    hours: now.getHours(),
  };
};

const padZero = (num) => {
  const s = "0" + num;
  return s.slice(-2);
};

const StartPage = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  useAxiosFetch(`${API_URL}/api/public_fishcatch`);

  const { fetchError, isLoading, fishCatches } = useApplicationContext();
  const { userPosition, setUserPosition } = useUserContext();

  const [time, setTime] = useState(getTime());

  const showPostition = (position) => {
    const { latitude, longitude } = position.coords;
    setUserPosition({ lat: latitude, lng: longitude });
  };

  useEffect(() => {
    let isMounted = true;
    setInterval(() => {
      if (isMounted) {
        setTime(getTime());
      }
    }, 1000);

    if (!userPosition && isMounted) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(showPostition);
      }
    }

    const cleanUp = () => {
      isMounted = false;
    };

    return cleanUp;
  }, []);

  return (
    <article className="startPage">
      <h3>
        {`${padZero(time.hours)}:${padZero(time.minutes)}:${padZero(
          time.seconds
        )} ${time.day} ${time.year}-${padZero(time.month + 1)}-${padZero(
          time.date
        )}`}
      </h3>
      <h2>Latest catches</h2>
      <div className="fishCatches">
        {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
        {fetchError && <p className="error">Could not get data</p>}
        {!isLoading &&
          !fetchError &&
          fishCatches
            .sort((a, b) => {
              const aTime = new Date(a.date).getTime();
              const bTime = new Date(b.date).getTime();
              return parseInt(bTime) - parseInt(aTime);
            })
            .slice(0, 4)
            .map((fishCatch) => (
              <FishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
            ))}
      </div>
      <h3>There are {fishCatches.length} catches.</h3>
      {userPosition && (
        <>
          <h2>Your position:</h2>
          <p>
            {userPosition.lat} {userPosition.lng}
          </p>
        </>
      )}
    </article>
  );
};

export default StartPage;
