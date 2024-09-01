import React, { useState } from 'react';

export default function Button({ breed }) {
  const [breedPhotos, setBreedPhotos] = useState([]);

  const handleBreedClick = () => {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
      .then(response => response.json())
      .then(data => {
        setBreedPhotos(data.message);
      });
  };

  return (
    <div>
      <button className='button' onClick={handleBreedClick}>
        {breed}
      </button>
      <div className='photos'>
        {breedPhotos.map((photo, index) => (
          <img key={index} src={photo} alt="Dog" className='dog-photo' />
        ))}
      </div>
    </div>
  );
}
