/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { s } from '../lib/ml';
import { sessionCheck } from '../lib/script';
import '../css/center.css';

const { log } = console;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',

      displayError: 'hidden',
      errorMessage: 'Please fill out all of this field.',

      alert: 'hidden',
      notDisabled: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  loginUser() {
    const { user, password } = this.state;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}login`, {
        user,
        password,
      })
      .then((res) => {
        this.setState({ notDisabled: true });
        if (typeof Storage === 'function') {
          log(res);
          const data = res.data.values;
          window.localStorage.setItem('apaLiatLiat', data.token);
          window.localStorage.setItem('id', data.id);
          window.localStorage.setItem('username', data.username);
          window.localStorage.setItem('role', data.role);
          window.location.href = 'engineers';
        } else {
          // eslint-disable-next-line no-alert
          alert('Sorry! No web storage support.');
        }
      })
      .catch(() => {
        this.setState({
          displayError: 'block',
          errorMessage: 'Incorrect username or password.',
          notDisabled: true,
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-syntax
    for (const state in this.state) {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state[state] === '') {
        this.setState({
          displayError: 'block',
          errorMessage: 'Please fill out all of this field.',
        });
        return;
      }
    }
    this.setState({ notDisabled: false });
    this.loginUser();
  }

  render() {
    sessionCheck();
    s('html').classList.add('register-page-full');
    document.body.classList.add('register-page-full', 'register-center');
    const {
      user, password, displayError, errorMessage, notDisabled,
    } = this.state;
    return (
      <div className="w-full max-w-xs bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="text-4xl mb-4">
          <h1>Login</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="user"
            >
              Username or email address
              <input
                value={user}
                onChange={this.handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="user"
                type="text"
                placeholder="aku-tanpa-mu"
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
              <input
                value={password}
                onChange={this.handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
              />
            </label>
            <p
              className={
                `text-red-500 text-xs italic ${displayError}`
              }
            >
              {errorMessage}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!notDisabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>

            <Link to="engineers/signup">
              <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Or create account
              </a>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
