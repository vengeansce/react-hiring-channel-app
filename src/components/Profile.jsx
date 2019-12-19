import React from "react";
import axios from "axios";
import { s } from "../lib/ml";
import "../css/center.css";

const log = console.log;

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      skills: "",
      salary: "",
      updated: "",
      img: "",
      email: "",
      description: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:8000/api/v1/engineers/${this.props.id}`)
      .then(res => {
        const {
          name,
          skills,
          salary,
          updated,
          img,
          email,
          description
        } = res.data.values[0];
        this.setState({
          name,
          skills,
          salary,
          updated,
          img,
          email,
          description
        });
      })
      .catch(err => alert(err))
      .finally(() => log("Getting data: done"));
  }

  render() {
    s("html").classList.add("register-page-full");
    document.body.classList.add("register-page-full", "register-center");
    return (
      <div className="max-w-xl w-full lg:flex">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url("http://localhost:8000/${this.state.img}")`
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
            <span className="w-full sm:w-1/2 text-indigo-900 my-2">Skills</span>
            <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
              {this.state.skills}
            </span>
            <span className="w-full sm:w-1/2 text-indigo-900 my-2">Salary</span>
            <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
              {"$ " + this.state.salary}
            </span>
            <span className="w-full sm:w-1/2 text-indigo-900 my-2">
              Last updated
            </span>
            <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
              {this.state.updated}
            </span>
            <span className="w-full sm:w-1/2 text-indigo-900 my-2">Email</span>
            <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
              {this.state.email}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
