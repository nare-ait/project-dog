import React, { useState, useEffect } from 'react';

const imgStyle = {width:'200px',height:'200px'}
const pStyle = {fontSize:'20px',fontWeight:'bold'}
const divStyle = {display:'flex',flexDirection:'row',gap:'30px'}

export default function Header() {
    const [dogBreeds, setDogBreeds] = useState([]);
    const [activeBreeds, setActiveBreeds] = useState([]);

    useEffect(() => {
        fetch('https://dog.ceo/api/breeds/list/all/random/10')
            .then(response => response.json())
            .then(data => {
                setDogBreeds(Object.keys(data.message));
            });
    }, []);

    const handleBreedClick = (breed) => {
        if (!activeBreeds.some(active => active.breed === breed)) {
            fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
                .then(response => response.json())
                .then(data => {
                    setActiveBreeds(prevBreeds => [...prevBreeds, { breed, photos: data.message }]);
                });
        }
    };

    return (
        <>
            <div style={divStyle}>
                {dogBreeds.map(breed => (
                    <p key={breed} style={pStyle} onClick={() => handleBreedClick(breed)}>
                        {breed}
                    </p>
                ))}
            </div>
            <div>
                {activeBreeds.map(({ breed, photos }) => (
                    <div key={breed}>
                        <h2>{breed}</h2>
                        <div className='photos'>
                            {photos.map((photo, index) => (
                                <img
                                    style={imgStyle}
                                    key={index}
                                    src={photo}
                                    alt={`Dog ${index + 1}`}
                                    className='dog-photo'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
