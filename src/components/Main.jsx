import React from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

import Card from 'Card.jsx';
import "../App.css";

const api = "http://localhost:8000/";
const log = console.log;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      engineers: [],
      value: "",
      page: 1,
      previousPage: 1,
      nextPage: 2,
      show: 10,
      sort: "updated"
    };
    this.inputSearchHandle = this.inputSearchHandle.bind(this);
    this.userSelect = this.userSelect.bind(this);
    this.pagingClick = this.pagingClick.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/v1/engineers?page=1")
      .then(res => {
        const data = res.data.values;
        this.setState({
          engineers: data.result,
          page: data.page,
          previousPage: data.previousPage,
          nextPage: data.nextPage
        });
      })
      .catch(err => alert(err))
      .finally(() => log("Getting data: done"));
  }

  inputSearchHandle(e) {
    this.setState({ value: e.target.value }, () => this.handleChange());
  }

  userSelect(e) {
    this.setState({ [e.target.id]: e.target.value }, () => this.handleChange());
  }

  pagingClick(page) {
    this.handleChange(page);
  };

  handleChange(page = this.state.page) {
    const value = this.state.value;
    const uri = `http://localhost:8000/api/v1/engineers?page=${page}&show=${this.state.show}&sort=${this.state.sort}&name=${value}&skills=${value}&salary=${value}`;
    axios
      .get(uri)
      .then(res => {
        const data = res.data.values;
        if (data.nextPage != null) {
          this.setState({
            engineers: data.result,
            page: data.page,
            previousPage: data.previousPage,
            nextPage: data.nextPage
          });
        } else if (data.nextPage == null) {
          this.setState({ previousPage: data.page - 1 });
        }
      })
      .catch(err => alert(err))
      .finally(() => log("Getting data: done"));
  }

  render() {
    return (
      <>
        <Header value={this.state.value} inputChange={this.inputSearchHandle} />

        <div className="p-8">
          <div className="mb-4">
            <span>
              <span>Show</span>
              <div class="inline-block relative mx-2">
                <select
                  id="show"
                  value={this.state.show}
                  onChange={this.userSelect}
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option selected value={10}>
                    10
                  </option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
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
              <div class="inline-block relative mx-2">
                <select
                  id="sort"
                  value={this.state.sort}
                  onChange={this.userSelect}
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option selected value={"updated"}>
                    Updated
                  </option>
                  <option value={"name"}>Name</option>
                  <option value={"skills"}>Skills</option>
                  <option value={"salary"}>Salary</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    class="fill-current h-4 w-4"
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
            {this.state.engineers.map((elm, i) => (
              <Card
                href={"engineers/" + elm.id}
                key={i}
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
            <div class="inline-flex">
              <div className="text-center">
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                  onClick={() => this.pagingClick(this.state.previousPage)}
                >
                  Prev
                </button>
                <span class="inline-block h-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                  {this.state.page}
                </span>
                <button
                  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                  onClick={() => this.pagingClick(this.state.nextPage)}
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

export default Main;

// Animation pake js kasih style height = offsetY, trus pas animate kasih 100%
// Do spesific search
