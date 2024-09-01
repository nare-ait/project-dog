import React, { useState, useEffect } from 'react';
import './Header.css';
import Button from './Button';

export default function Header() {
  const [dogBreeds, setDogBreeds] = useState([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all/random/10')
      .then(response => response.json())
      .then(data => {
        setDogBreeds(Object.keys(data.message));
      });
  }, []);

  return (
    <div className='div'>
      {dogBreeds.map(breed => (
        <Button key={breed} breed={breed} />
      ))}
    </div>
  );
}
