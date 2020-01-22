import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { search } from '../redux/actions';

import Header from './Header';
import Footer from './Footer';
import Card from './Card';
import Loader from './Loader';
import { timeConverter } from '../lib/script';
import '../App.css';

const api = process.env.REACT_APP_BASE_URL;
const { log } = console;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      engineers: [],
      page: 1,
      previousPage: 1,
      nextPage: 2,
      show: 10,
      sort: 'updated',
      isLoading: false,
    };
    this.inputSearchHandle = this.inputSearchHandle.bind(this);
    this.userSelect = this.userSelect.bind(this);
    this.pagingClick = this.pagingClick.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}engineers?page=1`)
      .then((res) => {
        const data = res.data.values;
        this.setState({
          engineers: data.result,
          page: data.page,
          previousPage: data.previousPage,
          nextPage: data.nextPage,
        });
      })
      // eslint-disable-next-line no-alert
      .catch(() => alert('Something went wrong.'))
      .finally(() => log('Getting data: done'));
  }

  inputSearchHandle(e) {
    const { handleSearch } = this.props;
    handleSearch(e.target.value);
    this.handleChange();
  }

  userSelect(e) {
    this.setState({ [e.target.id]: e.target.value }, () => this.handleChange());
  }

  pagingClick(page) {
    this.handleChange(page);
  }

  load() {
    const { isLoading } = this.state;
    this.setState({ isLoading: !isLoading });
    // document.body.classList.toggle('overflow-hidden');
  }

  handleChange(pageParam) {
    this.load();
    let page = '';
    if (pageParam) {
      page = pageParam;
    } else {
      const { page: pageState } = this.state;
      page = pageState;
    }
    const { search: value } = this.props;
    const { show, sort } = this.state;
    const uri = `${process.env.REACT_APP_API_ENDPOINT}engineers?page=${page}&show=${show}&sort=${sort}&name=${value}&skills=${value}&salary=${value}`;
    axios
      .get(uri)
      .then((res) => {
        const data = res.data.values;
        if (data.nextPage != null) {
          this.setState({
            engineers: data.result,
            page: data.page,
            previousPage: data.previousPage,
            nextPage: data.nextPage,
          });
        } else if (data.nextPage == null) {
          this.setState({ previousPage: data.page - 1 });
        }
      })
      // eslint-disable-next-line no-alert
      .catch(() => alert('Something went wrong.'))
      .finally(() => this.load());
  }

  render() {
    const {
      show, page, previousPage, nextPage, sort, engineers, isLoading,
    } = this.state;
    return (
      <>
        {isLoading
        && <Loader />}
        <Header inputChange={this.inputSearchHandle} />
        <div className="p-8">
          <div className="mb-4">
            <span>
              <span>Show</span>
              <div className="inline-block relative mx-2">
                <select
                  id="show"
                  value={show}
                  onChange={this.userSelect}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value={10}>
                    10
                  </option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </span>

            <span className="ml-2">
              <span>Sort</span>
              <div className="inline-block relative mx-2">
                <select
                  id="sort"
                  value={sort}
                  onChange={this.userSelect}
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="updated">
                    Updated
                  </option>
                  <option value="name">Name</option>
                  <option value="skills">Skills</option>
                  <option value="salary">Salary</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </span>
          </div>

          <div className="flex flex-wrap justify-center -m-2">
            {engineers.map((elm) => (
              <Card
                href={`engineers/${elm.id}`}
                key={elm.id}
                name={elm.name}
                skills={elm.skills}
                salary={elm.salary}
                email={elm.email}
                updated={timeConverter(Number(elm.updated))}
                img={api + elm.img}
              />
            ))}
          </div>

          <div className="center mt-4">
            <div className="inline-flex">
              <div className="text-center">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => this.pagingClick(previousPage)}
                  type="button"
                >
                  Prev
                </button>
                <span className="inline-block h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                  {page}
                </span>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  onClick={() => this.pagingClick(nextPage)}
                  type="button"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  search: state.search,
});
const mapDispatchToProps = (dispatch) => ({
  handleSearch: (value) => dispatch(search(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// Animation pake js kasih style height = offsetY, trus pas animate kasih 100%
// Do spesific search
