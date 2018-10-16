import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      username: '',
      passowrd: '',
    };
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({passowrd: event.target.value});
  }

  render() {
    const {
      username,
      passowrd
    } = this.state;

    return (
      <div>
        <h1>Welecom to the Login page</h1>
        <form action="/login" method="post">
          <div>
            <label htmlFor="username" id="usnernameLabel">
              Name:
              <input type="text" name="username" value={username} onChange={this.handleUsernameChange} required />
            </label>
          </div>

          <div>
            <label htmlFor="password" id="passowrdLabel">
              Password:
              <input type="password" name="password" value={passowrd} onChange={this.handlePasswordChange} required />
            </label>
          </div>

          <button name="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
