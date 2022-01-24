import React from 'react';

const Person = ({ person, filterName, handleNameDel }) => {
    const name = person.name.toLowerCase().includes(filterName.toLowerCase());
    console.log(name)
  
    return (
        <>
            <p key={person.id}>
                {person.name} {person.number}
                <button 
                  id={person.id} 
                  onClick={handleNameDel} 
                >
                  delete
                </button>
            </p>
        </>
    )
  }

  export default Person;