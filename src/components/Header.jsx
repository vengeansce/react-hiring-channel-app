import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../logo-arkademy.svg';

function sessionDestroy() {
  localStorage.clear();
  window.location.reload();
}

function engineersHome() {
  window.location.href = `${window.location.origin}/engineers`;
}

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: window.localStorage.getItem('username') || 'Login!',
    };
  }

  render() {
    const { search: value, inputChange } = this.props;
    const { username } = this.state;
    const searchBar = window.location.pathname.length === 10 ? '' : 'invisible';
    return (
      <header className="border-b-4 p-5">
        <div className="flex flex-wrap">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
          <div onClick={engineersHome} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/6 h-12 cursor-pointer center" role="link" tabIndex="0">
            <img className="arkademy-logo inline" src={logo} alt="Arkademy" />
          </div>
          <div className={`${searchBar} w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-3/6 h-12 py-1 relative`}>
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
                    className="bg-red-500 hover:bg-red-700 leading-tight text-white font-bold h-full px-4 rounded"
                    type="button"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to={`//${window.location.host}/login`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-full px-4 rounded" type="button">
                      Login
                  </button>
                </Link>
              )}
            </span>
            <span className="pl-4">
              {localStorage.length === 4 ? (
                <>
                  <span className="px-4 text-gray-700 leading-tight">
                    <i className="fas fa-comment-dots" />
                  </span>
                  <span className="px-4 text-gray-700 leading-tight">
                    <i className="fas fa-bell" />
                  </span>
                </>
              ) : (
                <Link to="companies/signup">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold h-full px-4 rounded" type="button">
                      Company
                  </button>
                </Link>
              )}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(Header);
