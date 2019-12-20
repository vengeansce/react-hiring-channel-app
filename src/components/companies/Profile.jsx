import React from "react";
import axios from "axios";
import Update from "./Update";
import { s } from "../../lib/ml";
import "../../css/center.css";

const log = console.log;

function isLoggedIn(propsId) {
  const id = window.localStorage.getItem("id");
  const apa_liat_liat = window.localStorage.getItem("apa_liat_liat");
  if (id && apa_liat_liat) {
    if (propsId == id) {
      return true;
    }
  }

  return false;
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      img: "",
      email: "",
      description: "",

      isLoggedIn: false,
      showModal: false,
      display: "block"
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoggedIn: isLoggedIn(this.props.id) });
    axios
      .get(`http://localhost:8000/api/v1/companies/${this.props.id}`)
      .then(res => {
        if (res.data.values.length > 0) {
          log(res);
          const {
            name,
            img,
            location,
            email,
            description
          } = res.data.values[0];
          this.setState({
            name,
            img,
            location,
            email,
            description
          });
        } else {
          this.setState({ display: "hidden" });
          alert("Page not found.");
        }
      })
      .catch(err => log(err))
      .finally(() => log("Getting data: done"));
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    s("html").classList.add("register-page-full");
    document.body.classList.add("register-page-full", "register-center");
    return (
      <div className={this.state.display}>
        {this.state.showModal && (
          <Update
            engineerId={this.props.id}
            hide={this.toggleModal}
            name={this.state.name}
            email={this.state.email}
            address={this.state.location}
            description={this.state.description}
          />
        )}
        {this.state.isLoggedIn && (
          <div className="text-right">
            <button
              onClick={this.toggleModal}
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mb-2 rounded"
            >
              Edit
            </button>
          </div>
        )}
        <div className="max-w-xl w-full lg:flex">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url("http://localhost:8000/${this.state.img}")`,
              backgroundPosition: "center"
            }}
            title="Woman holding a mug"
          ></div>
          <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-black font-bold text-xl mb-2">
                {this.state.name}
              </div>
              <p className="text-grey-darker text-base">
                {this.state.description}
              </p>
            </div>
            <div className="border-b-2 font-semibold text-lg py-2">About</div>
            <div className="flex flex-wrap text-base font-medium mt-2">
              <span className="w-full sm:w-1/2 text-indigo-900 my-2">
                Email
              </span>
              <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
                {this.state.email}
              </span>
              <span className="w-full sm:w-1/2 text-indigo-900 my-2">
                Address
              </span>
              <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
                {this.state.location}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;