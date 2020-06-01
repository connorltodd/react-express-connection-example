import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    users: [],
    name: '',
    email: '',
    password: ''
  }

  componentDidMount () {
      axios.get('http://localhost:3000/api/users')
      .then(response => this.setState({ users: response.data }));
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value })
  }

  addUser = (event) => {
    event.preventDefault();
    const { name, email, password } = this.state;
    axios.post('http://localhost:3000/api/users', {
      name: name,
      email: email,
      password: password
    })
    .then(response =>  this.setState({ users: [...this.state.users, response.data]}))

    this.setState({
      name: '',
      email: '',
      password: ''
    })
  }

  render () {
    const { users, name, email, password } = this.state;
    return (
      <div className="App">
        {users.map(user => (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}

        <form onSubmit={this.addUser}>
          <div>
            <p>Name</p>
            <input name="name" value={name} onChange={this.handleChange} />
          </div>
          <div>
            <p>Email</p>
            <input name="email" value={email} onChange={this.handleChange} />
          </div>
          <div>
            <p>Password</p>
            <input type="password" name="password" value={password} onChange={this.handleChange} />
          </div>
          <button type="submit" >Submit new user</button>
        </form>
        <br />
        <br />
      </div>
    );
  }
}

export default App;
