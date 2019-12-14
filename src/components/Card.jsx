import React from "react";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="max-w-xs rounded shadow-lg relative card-size">
        <img src="assets/images/logo-arkademy.svg" alt="Profile Picture" className="w-full h-full"/>
        <div className="absolute top-0 w-full px-4">
            <div className="text-right text-sm">
                <span className="fas fa-clock mx-2 text-red-500"></span>
                <span>5 min</span>
                </div>
        </div>
        <div className="p-4 absolute bottom-0 w-full bg-transparent text-white rounded-b">
        <div className="opacity-100">
          <div className="text-xl font-bold">Budi Setiawan</div>
          <div>
              <div>Skills:</div>
              <div className="text-sm">Node.js, React, PHP, MySQL</div>
          </div>
          <div className="hidden">budi@budi.com</div>
          <div className="text-right text-teal-300">$1000</div>
        </div>
        </div>
      </div>
    );
  }
}

export default Card;

// Hover muncul deskripsi (email) set width 0 lalu muncul, button untuk details
// Lalu muncul tombol kirim pesan buat company
// Atur opacity text 