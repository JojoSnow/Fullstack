import React, { useState } from 'react';

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
              </p>
          )}
      </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' , id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]); 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNum,
      id: persons.length + 1,
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
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNum('');
      setFilterName('');
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
        <Persons persons={persons} filterName={filterName} />
      </div>
    </div>
  );

};

export default App;