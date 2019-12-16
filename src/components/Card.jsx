import React from "react";
import Button from "./Button";
import { s, ss } from "../lib/ml";
import { red } from "ansi-colors";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleShowMore = () => {
    s("#more").classList.toggle("hidden");
  };

  render() {
    return (
      <div className="max-w-xs rounded shadow-lg relative overflow-hidden card-size">
        <img
          src="assets/images/logo-arkademy.svg"
          alt="Profile Picture"
          className="w-full h-full"
        />
        <div className="absolute top-0 w-full px-4">
          <div className="text-right text-sm">
            <span className="fas fa-clock mx-2 text-red-500"></span>
            <span>5 min</span>
          </div>
        </div>
        <div
          id="textCard"
          onMouseEnter={this.toggleShowMore}
          onMouseLeave={this.toggleShowMore}
          className="arrow-after text-card transform cursor-pointer p-4 absolute bottom-0 w-full bg-transparent text-white center"
        >
          <div className="relative">
            <div className="text-xl font-bold">Budi Setiawan</div>
            <div>
              <div className="text-sm">Node.js, React, PHP, MySQL</div>
            </div>
            <div className="text-right text-teal-300">$1000</div>
            <div className="my-2"></div>
            <div id="more" className="hidden">
              <Button.Message text="Message" />
              <div className="my-2"></div>
              <Button.Mail text="budi@dot.com" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

// Animation pake js kasih style height = offsetY, trus pas animate kasih 100%
