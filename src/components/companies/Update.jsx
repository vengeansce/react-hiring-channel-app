import React from 'react';
import FormData from 'form-data';
import axios from 'axios';

const { log } = console;

class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      address: props.address,
      description: props.description,
      img: '',

      errorMessage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fileHandleChange = this.fileHandleChange.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  fileHandleChange(e) {
    this.setState({ img: e.target.files[0] });
  }

  updateUser() {
    const { engineerId: id } = this.props;

    const token = window.localStorage.getItem('apaLiatLiat');
    const {
      name, address, description, img,
    } = this.state;
    const form = new FormData();

    form.append('name', name);
    form.append('description', description);
    form.append('location', address);
    form.append('img', img);
    form.append('id', id);

    axios
      .put(`http://localhost:8000/api/v1?token=${token}`, form, {
        headers: {
          // eslint-disable-next-line no-underscore-dangle
          'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
        },
      })
      .then(() => {
        window.location.reload();
      })
      .catch(() => log('Something error'));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.updateUser();
    // this.setState({ notDisabled: false });
  }

  render() {
    const { hide } = this.props;
    const {
      name, address, description, errorMessage,
    } = this.state;
    return (
      <div
        className="inset-0 absolute center"
        style={{ backgroundColor: 'rgba(0, 0, 0, .5)' }}
      >
        <form
          onSubmit={this.handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded"
        >
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="name"
              >
                Name
                <input
                  value={name}
                  onChange={this.handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="name"
                  type="text"
                  placeholder="PT Papa Jaya Agung"
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="file"
              >
                Image
                <input
                  onChange={this.fileHandleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="img"
                  type="file"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2" />
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
                <input
                  value={address}
                  onChange={this.handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="address"
                  type="text"
                  placeholder="Babelan, Bekasi"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="description"
              >
                About Company
                <input
                  value={description}
                  onChange={this.handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="description"
                  type="text"
                  placeholder="Make it as long and as crazy as you'd like"
                />
              </label>
              <p className="text-red-500 text-xs italic">
                {errorMessage}
              </p>
            </div>
          </div>
          <div className="text-right mt-6">
            <button
              onClick={hide}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-24 rounded mr-3"
              type="button"
            >
              Cancel
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-24 rounded" type="submit">
              Edit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Update;
