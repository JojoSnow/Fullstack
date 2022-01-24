import React, { useEffect, useState } from 'react';
import personService from './services/persons';
import Person from './components/Person.js';
// import axios from 'axios';

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

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState('');
  
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

    if (newName.length !== 0) {
      if (name.length !== 0) {
        if (name[0].name === newName) {
          // if (window.confirm(`${newName} is already added to Phonebook, replace the old number with a new one?`)) {

          //   axios
          //     .put(`http://localhost:3001/persons/${name[0].id}`, personObject)
            
          //   setNewName('');
          //   setNewNum('');
          //   setFilterName('');
            
          //   window.location.reload();
          // }

          personService
            .update(name[0].id, personObject)
            .then(error => {
              setMessage(
                `Changed ${name[0].name} number`
              )
              setTimeout(() => {
                setMessage(null)
                window.location.reload()
              }, 3000)
              setNewName('');
              setNewNum('');
              setFilterName('');
            })
        }
      } else {          
        personService
          .create(personObject)
          .then(response => {
            setPersons(persons.concat(response))
            setMessage(
              `Added ${newName}`
            )
            setTimeout(() => {
              setMessage(null)
              window.location.reload()
            }, 3000)
            setNewName('');
            setNewNum('');
            setFilterName('');
          })
          
    } 

      // axios
      //   .post('http://localhost:3001/persons', personObject)
    }
  }

  const handleNameDel = (event) => {
    const id = event.target.id;
    const nameObject = persons.find(n => n.id === id)
    const name = nameObject.name

    personService
        .del(id)
        .then(error => {
          setMessage(
            `Deleted ${name}`
          )
          setTimeout(() => {
            setMessage(null)
            window.location.reload()
          }, 3000);
        })
    
    // if (window.confirm(`Delete ${name} ?`)) {
      // axios
      //   .delete(`http://localhost:3001/persons/${id}`);      
    // }
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

        <Notification message={message} />

        <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h2>Add a new</h2>

        <PersonForm  addPerson={addPerson} 
          newName={newName} handleNameChange={handleNameChange} 
          newNum={newNum} handleNumChange={handleNumChange} 
        />

      <h2>Numbers</h2>

      <div>
        {persons.map(person =>
          <Person 
            key={person.id} 
            person={person}
            filterName={filterName}
            handleNameDel={handleNameDel} />
        )}
        
      </div>
    </div>
  );

};

export default App;