import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo-arkademy.svg';

function sessionDestroy() {
  localStorage.clear();
  window.location.reload();
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem('username') || 'Login!',
    };
  }

  render() {
    const { value, inputChange } = this.props;
    const { username } = this.state;
    return (
      <header className="border-b-4 p-5">
        <div className="flex flex-wrap">
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/6 h-12 center">
            <img className="arkademy-logo inline" src={logo} alt="Arkademy" />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-3/6 h-12 relative">
            <i className="fas fa-search absolute py-3 pl-4" />
            <input
              className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              value={value}
              onChange={inputChange}
              placeholder="Search by name, skills, or salary"
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-2/4 lg:w-2/4 xl:w-2/6 h-12 py-2 text-center inline-block">
            <span className="pr-4 border-r-2">
              {localStorage.length === 4 ? (
                <>
                  <Link
                    to={
                      `${localStorage.role === 'company'
                        ? 'companies'
                        : 'engineers'
                      }/${
                        localStorage.id}`
                    }
                    target="_blank"
                  >
                    <span className="px-4 text-gray-700 leading-tight">
                      <span className="mx-2 rounded-full w-6 h-6 bg-gray-400 inline-block">
                        {username.charAt(0).toUpperCase()}
                      </span>
                      <span>{username}</span>
                    </span>
                  </Link>
                  <button
                    onClick={sessionDestroy}
                    className="bg-red-500 hover:bg-red-700 leading-tight text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="login">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button">
                    Login
                  </button>
                </Link>
              )}
              {}
            </span>
            <span className="pl-4">
              <span className="px-4 text-gray-700 leading-tight">
                <i className="fas fa-comment-dots" />
              </span>
              <span className="px-4 text-gray-700 leading-tight">
                <i className="fas fa-bell" />
              </span>
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
