import React from 'react';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Update from './Update';
import { s } from '../../lib/ml';
import '../../css/center.css';

const { log } = console;

function isLoggedIn(propsId) {
  const id = window.localStorage.getItem('id');
  const apaLiatLiat = window.localStorage.getItem('apaLiatLiat');
  if (id && apaLiatLiat) {
    if (propsId === id) {
      return true;
    }
  }

  return false;
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      img: '',
      email: '',
      description: '',
      loggedIn: false,
      showModal: false,
      display: 'block',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    const { id } = this.props;
    this.setState({ loggedIn: isLoggedIn(id) });
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}companies/${id}`)
      .then((res) => {
        if (res.data.values.length > 0) {
          log(res);
          const {
            name,
            img,
            location,
            email,
            description,
          } = res.data.values[0];
          this.setState({
            name,
            img,
            location,
            email,
            description,
          });
        } else {
          this.setState({ display: 'hidden' });
          log('Page not found.');
        }
      })
      .catch((err) => log(err))
      .finally(() => log('Getting data: done'));
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  render() {
    document.body.classList.add('min-h-screen');
    s('#root').classList.add('flex', 'flex-col', 'min-h-screen');
    const { id } = this.props;
    const {
      display, name, email, location, description, showModal, img, loggedIn,
    } = this.state;
    return (
      <>
        <Header />
        <div className={`${display} flex-grow mx-auto my-8`}>
          {showModal && (
          <Update
            engineerId={id}
            hide={this.toggleModal}
            name={name}
            email={email}
            address={location}
            description={description}
          />
          )}
          {loggedIn && (
          <div className="text-right">
            <button
              onClick={this.toggleModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 mb-2 rounded"
              type="button"
            >
              Edit
            </button>
          </div>
          )}
          <div className="max-w-xl w-full lg:flex">
            <div
              className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
              style={{
                backgroundImage: `url("${process.env.REACT_APP_BASE_URL + img}")`,
                backgroundPosition: 'center',
              }}
              title="Woman holding a mug"
            />
            <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8">
                <div className="text-black font-bold text-xl mb-2">
                  {name}
                </div>
                <p className="text-grey-darker text-base">
                  {description}
                </p>
              </div>
              <div className="border-b-2 font-semibold text-lg py-2">About</div>
              <div className="flex flex-wrap text-base font-medium mt-2">
                <span className="w-full sm:w-1/2 text-indigo-900 my-2">
                Email
                </span>
                <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
                  {email}
                </span>
                <span className="w-full sm:w-1/2 text-indigo-900 my-2">
                Address
                </span>
                <span className="w-full sm:w-1/2 text-indigo-600 my-2 cut-overflow-text">
                  {location}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default Profile;
