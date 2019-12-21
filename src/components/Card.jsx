import React from 'react';
import Button from './Button';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { more: 'hidden' };
    this.hyperlink = this.hyperlink.bind(this);
    this.toggleShowMore = this.toggleShowMore.bind(this);
  }

  randomHeight(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  toggleShowMore() {
    if (localStorage.getItem('role') === 'company') {
      const isMore = this.state.more;
      this.setState({
        more: isMore === 'hidden' ? 'inline-block' : 'hidden',
      });
    }
  }

  hyperlink(link) {
    window.open(`../${link}`);
  }

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
                <span className="fas fa-clock mx-2 text-red-500" />
                <span>{this.props.updated}</span>
              </span>
            </div>
          </div>
          <div
            id="textCard"
            onClick={() => this.hyperlink(this.props.href)}
            onMouseEnter={this.toggleShowMore}
            onMouseLeave={this.toggleShowMore}
            className="arrow-after overflow-hidden text-card transform cursor-pointer p-4 absolute bottom-0 w-full bg-transparent text-white center"
          >
            <div className="relative w-full inline-block overflow-hidden">
              <div className="text-xl font-bold">{this.props.name}</div>
              <div>
                <div className="text-sm">{this.props.skills}</div>
              </div>
              <div className="text-right text-teal-300">
                  $
                {' '}
                {this.props.salary}
              </div>
              <div className="my-2" />
              <div
                id="more"
                className={`w-full inline-block ${this.state.more}`}
              >
                <Button.Message text="Message" />
                <div className="my-2" />
                <Button.Mail text={this.props.email} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
