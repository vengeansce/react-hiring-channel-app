import React from "react";
import axios from "axios";
import { s } from "../lib/ml";
import "../css/center.css";

const log = console.log;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",

      displayError: "hidden",
      errorMessage: "Please fill out all of this field.",

      alert: "hidden",
      notDisabled: true
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
      .post("http://localhost:8000/api/v1/login", {
        user,
        password
      })
      .then(res => {
        this.setState({ notDisabled: true });
        if (typeof (Storage == "function")) {
          log(res);
          const data = res.data.values;
          window.localStorage.setItem("apa_liat_liat", data.token);
          window.localStorage.setItem("id", data.id);
          window.localStorage.setItem("username", data.username);
          window.localStorage.setItem("level", data.level);
          window.location.href = "engineers";
        } else {
          alert("Sorry! No web storage support.");
        }
      })
      .catch(err => {
        this.setState({
          displayError: "block",
          errorMessage: "Incorrect username or password.",
          notDisabled: true
        });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    for (const state in this.state) {
      if (this.state[state] == "") {
        this.setState({
          displayError: "block",
          errorMessage: "Please fill out all of this field."
        });
        return;
      }
    }
    this.setState({ notDisabled: false });
    this.loginUser();
  }

  render() {
    s("html").classList.add("register-page-full");
    document.body.classList.add("register-page-full", "register-center");
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
            </label>
            <input
              value={this.state.user}
              onChange={this.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="user"
              type="text"
              placeholder="aku-tanpa-mu"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={this.state.password}
              onChange={this.handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
            <p
              className={
                "text-red-500 text-xs italic " + this.state.displayError
              }
            >
              {this.state.errorMessage}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              disabled={!this.state.notDisabled}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
