import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <header className="border-b-4 p-5">
            <div class="flex">
                <div class="w-1/6 h-12 center">
                    <img className="arkademy-logo inline" src="assets/images/logo-arkademy.svg" alt="Arkademy" />
                </div>
                <div class="w-3/6 h-12 relative">
                    <i class="fas fa-search absolute py-3 pl-4"></i>
                    <input
                        className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 pl-12 pr-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="inline-full-name" type="text" value="Jane Doe" />
                </div>
                <div class="w-2/6 h-12 py-2 text-center inline-block">
                    <span className="pr-4 border-r-2">
                        <span className="px-4 text-gray-700 leading-tight">Home</span>
                        <span className="px-4 text-gray-700 leading-tight">
                            <span className="mx-2 rounded-full w-6 h-6 bg-gray-400 inline-block">A</span>
                            <span>Andreas</span>
                        </span>
                    </span>
                    <span className="pl-4">
                        <span className="px-4 text-gray-700 leading-tight"><i className="fas fa-comment-dots"></i></span>
                        <span className="px-4 text-gray-700 leading-tight"><i className="fas fa-bell"></i></span>
                    </span>
                </div>
            </div>
        </header>
    );
  }
}

export default Header;
