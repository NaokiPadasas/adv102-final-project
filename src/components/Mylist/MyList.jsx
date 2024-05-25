import React, { useState } from 'react';
import './MyList.css';

const MyList = () => {
  const [myList, setMyList] = useState([]);

  const addToMyList = (video) => {
    if (!myList.some((item) => item.id === video.id)) {
      setMyList([...myList, video]);
    }
  };

  const removeFromMyList = (video) => {
    setMyList(myList.filter((item) => item.id !== video.id));
  };

  return (
    <div className="my-list-container">
      <h2>My List</h2>
      <ul>
        {myList.map((video) => (
          <li key={video.id}>
            {video.title}{' '}
            <button onClick={() => removeFromMyList(video)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;
