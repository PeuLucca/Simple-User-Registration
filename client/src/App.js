import React, { useEffect, useState } from 'react';
import './App.css';
import { createUser, getUsers, searchUsers } from './api';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if(name === '' || email === '' || password === ''){
      alert('Insira todos os campos de cadastro!');
    } else {
      const newUser = { name, email, password };
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
      setName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if(searchTerm === '') {
      alert('Insira algum nome');
    } else {
      const searchResults = await searchUsers(searchTerm);
      setUsers(searchResults);
    }
  };

  const handleGetUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(()=>{
    handleGetUsers()
  }, [])

  return (
    <div className="App">
      <h1>Cadastro de Usuários</h1>
      <form onSubmit={handleCreateUser}>
        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>

      <hr />

      <h2>Buscar Usuários</h2>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Nome do usuário" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Buscar</button>
        <h2>Usuários Cadastrados</h2>
        <button onClick={handleGetUsers}>Atualizar Lista</button>
        <ul style={{ padding:"10px" }}>
          {users.map((user) => (
            <li key={user.id}>
              - {user.name} - <i>{user.email}</i>
            </li>
          ))}
        </ul>
      </form>

      <hr />
    </div>
  );
}

export default App;
