import React from "react";
import axios from "axios";
import Header from "./Header";

import Button from "./Button";
import { s, ss } from "../lib/ml";

const api = "http://localhost:8000/";
const log = console.log;

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { more: "hidden" };
  }

  randomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleShowMore = () => {
    const isMore = this.state.more;
    this.setState({
      more: isMore == "hidden" ? "block" : "hidden"
    });
  };

  render() {
    return (
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
        <div className="relative card-height rounded overflow-hidden shadow-lg">
          <img
            src={this.props.img}
            alt="Profile Picture"
            className="w-full h-full"
          />
          <div className="absolute top-0 w-full px-4 py-2">
            <div className="text-right text-sm">
              <span className="px-2 py-1 rounded-full bg-white">
                <span className="fas fa-clock mx-2 text-red-500"></span>
                <span>{this.props.updated}</span>
              </span>
            </div>
          </div>
          <div
            id="textCard"
            onMouseEnter={this.toggleShowMore}
            onMouseLeave={this.toggleShowMore}
            className="arrow-after text-card transform cursor-pointer p-4 absolute bottom-0 w-full bg-transparent text-white center"
          >
            <div className="relative">
              <div className="text-xl font-bold">{this.props.name}</div>
              <div>
                <div className="text-sm">{this.props.skills}</div>
              </div>
              <div className="text-right text-teal-300">
                $ {this.props.salary}
              </div>
              <div className="my-2"></div>
              <div id="more" className={this.state.more}>
                <Button.Message text="Message" />
                <div className="my-2"></div>
                <Button.Mail text={this.props.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
    };
    this.inputSearchHandle = this.inputSearchHandle.bind(this);
    this.userSelect = this.userSelect.bind(this);
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

  timeConverter(menit) {
    const hari = 60 * 24;
    const bulan = hari * 30;
    const tahun = bulan * 12;
    if (menit > tahun) return Math.round(menit / tahun) + " T";
    else if (menit > bulan) return Math.round(menit / bulan) + " B";
    else if (menit > hari) return Math.round(menit / hari) + " D";
    else if (menit > 60) return Math.round(menit / 60) + " H";
    return menit + " m";
  }

  inputSearchHandle(e) {
    this.setState({value: e.target.value }, () => this.handleChange());
  }

  userSelect(e) {
    this.setState({show: e.target.value}, () => this.handleChange());
  }

  pagingClick = page => {
    this.handleChange(page)
  };

  handleChange(page = this.state.page) {
    log(this.state);
    const value = this.state.value;
    log(`http://localhost:8000/api/v1/engineers?page=${page}&show=${this.state.show}&name=${value}&skills=${value}&salary=${value}`)
    axios
      .get(
        `http://localhost:8000/api/v1/engineers?page=${page}&show=${this.state.show}&name=${value}&skills=${value}&salary=${value}`
      )
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
          <div id="show" className="mb-4">
            <span>Show</span>
            <div class="inline-block relative mx-2">
              <select value={this.state.show} onChange={this.userSelect} class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option selected value={10}>10</option>
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
            <span>entries</span>
          </div>

          <div className="flex flex-wrap justify-center -m-2">
            {this.state.engineers.map((elm, i) => (
              <Card
                key={i}
                name={elm.name}
                skills={elm.skills}
                salary={elm.salary}
                email={elm.email}
                updated={this.timeConverter(Number(elm.updated))}
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
      </>
    );
  }
}

export default Main;

// Animation pake js kasih style height = offsetY, trus pas animate kasih 100%
// Do spesific search 
