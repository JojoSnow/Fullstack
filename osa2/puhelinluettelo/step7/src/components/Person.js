import React from 'react';

const Person = ({ person, handleNameDel }) => {
  
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