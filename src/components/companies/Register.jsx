/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { s } from '../../lib/ml';
import { sessionCheck } from '../../lib/script';
import '../../css/tailwind.css';
import '../../css/center.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
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

  regisUser() {
    const {
      name, username, email, password,
    } = this.state;
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}companies/signup`, {
        name,
        username,
        email,
        password,
      })
      .then(() => {
        this.setState({ alert: 'block', notDisabled: true });
      })
      .catch(() => {
        this.setState({
          displayError: 'block',
          errorMessage: 'Username or email already registered',
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
    this.regisUser();
    this.setState({ notDisabled: false });
  }

  render() {
    sessionCheck();
    // Perfect centing
    s('html').classList.add('register-page-full');
    document.body.classList.add('register-page-full', 'register-center');

    const {
      name, alert, username, email, password, displayError,
      errorMessage, notDisabled,
    } = this.state;

    return (
      <div className="container mx-auto h-full shadow-lg bg-white rounded overflow-hidden">
        <div
          className={`bg-blue-900 text-center py-4 lg:px-4 ${alert}`}
        >
          <Link
            to="../../login"
            id="alert"
            className="p-2 bg-blue-800 items-center text-blue-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span className="flex rounded-full bg-blue-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              Success!
            </span>
            <span className="font-semibold mr-2 text-left flex-auto">
              Your account successfully registered. Login now!
            </span>
            <svg
              className="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </Link>
        </div>
        <div className="px-4">
          <div className="text-4xl py-6">
            <h1>Sign Up</h1>
          </div>
          <div className="center">
            <form className="w-full max-w-lg" onSubmit={this.handleSubmit}>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Company Name
                    <input
                      value={name}
                      onChange={this.handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="name"
                      type="text"
                      placeholder="PT Papa Jaya Agung"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="username"
                  >
                    Username
                    <input
                      value={username}
                      onChange={this.handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="username"
                      type="text"
                      placeholder="papajaya"
                    />
                  </label>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                    <input
                      value={email}
                      onChange={this.handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="email"
                      type="email"
                      placeholder="papa@jaya.com"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label
                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                    <input
                      value={password}
                      onChange={this.handleChange}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="password"
                      type="password"
                      placeholder="******************"
                    />
                  </label>
                  <p className="text-gray-600 text-xs italic">
                    Make it as long and as crazy as you&apos;d like
                  </p>
                  <p
                    className={
                      `text-red-500 text-xs italic ${displayError}`
                    }
                  >
                    {errorMessage}
                  </p>
                </div>
              </div>
              <div>
                <button
                  disabled={!notDisabled}
                  className="bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-4 mb-6 rounded"
                  type="submit"
                >
                  Sign Up
                </button>
                <Link to="../engineers/signup">
                  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="ml-4 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Sign Up as Engineer
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
