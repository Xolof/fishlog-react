import { useEffect, useState } from "react";
import { useApplicationContext } from "../context/DataContext";
import useAxiosFetch from "../hooks/useAxiosFetch";
import FishCatchCard from "./FishCatchCard";

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

  const { fetchError, isLoading, fishCatches, userPosition, setUserPosition } =
    useApplicationContext();

  useEffect(() => {
    if (!userPosition) {
      if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(showPostition);
      }
    }
  }, []);

  const [time, setTime] = useState(getTime());

  const showPostition = (position) => {
    const { latitude, longitude } = position.coords;
    setUserPosition({ lat: latitude, lng: longitude });
  };

  setInterval(() => {
    setTime(getTime());
  }, 1000);

  return (
    <article className="startPage">
      <h2>Latest catches</h2>
      <div className="fishCatches">
        {isLoading && !fetchError && <p className="statusMsg">Loading...</p>}
        {fetchError && <p className="error">Could not get data</p>}
        {!isLoading &&
          !fetchError &&
          fishCatches
            .slice(0, 4)
            .map((fishCatch) => (
              <FishCatchCard fishCatch={fishCatch} key={fishCatch.id} />
            ))}
      </div>
      <h2>{time.day}</h2>
      <h2>
        {time.year}-{padZero(time.month)}-{padZero(time.date)}
      </h2>
      <h2>
        {padZero(time.hours)}:{padZero(time.minutes)}:{padZero(time.seconds)}
      </h2>
      {userPosition && (
        <>
          <h2>Your position:</h2>
          <p>
            {userPosition.lat} {userPosition.lng}
          </p>
          {/* <h2>Current weather</h2> */}
        </>
      )}
    </article>
  );
};

export default StartPage;