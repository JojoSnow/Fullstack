import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import axios from 'axios';

const Filter = (props) => {
  return (
    <form>
      <div>
        filter shown with <input 
          value={props.filterName}
          onChange={props.handleFilterName}
        />
      </div>
    </form>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
            value={props.newName}
            onChange={props.handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={props.newNum}
            onChange={props.handleNumChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = (props) => {
  const {persons} = props;
  const names = persons.filter(person => 
    person.name.toLowerCase().includes(props.filterName.toLowerCase()));

  return (
      <>
          {names.map(person =>
              <p key={person.id}>
                  {person.name} {person.number}
                  <button 
                    id={person.id} 
                    onClick={props.handleNameDel} 
                  >
                    delete
                  </button>
              </p>
          )}
      </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response);
      });
  }, []);
  
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
    };

    const name = persons.filter(person => person.name === newName);
    
    if (name.length > 0) {
      if (name[0].name === newName) {
        alert(`${newName} is already added to Phonebook`);
        setNewName('');
        setNewNum('');
        setFilterName('');
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('');
          setNewNum('');
          setFilterName('');
        })

      // axios
      //   .post('http://localhost:3001/persons', personObject)
    }
  }

  const handleNameDel = (event) => {
    const id = event.target.id;
    const name = persons[id - 1].name;
    
    if (window.confirm(`Delete ${name} ?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`);

      window.location.reload();
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  }
  
  return (
    <div>
      <h1>Phonebook</h1>

        <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h2>Add a new</h2>

        <PersonForm  addPerson={addPerson} 
          newName={newName} handleNameChange={handleNameChange} 
          newNum={newNum} handleNumChange={handleNumChange} 
        />

      <h2>Numbers</h2>

      <div>
        <Persons persons={persons} filterName={filterName} handleNameDel={handleNameDel} />
      </div>
    </div>
  );

};

export default App;