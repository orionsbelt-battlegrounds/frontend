"use strict";

var React = require('react');

var OpenGames = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function () {

    return (
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Player</th>
            <th>Rating</th>
            <th>Units</th>
            <th>Type</th>
            <th>Rated?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ShadowKnight</td>
            <td>1400</td>
            <td>
              <div className="units-sprite units-raptor_n"></div>
              <div className="units-sprite units-nova_n"></div>
              <div className="units-sprite units-heavyseeker_n"></div>
            </td>
            <td>Regicide</td>
            <td>Casual</td>
            <td><a href="#" className="btn btn-info">Join</a></td>
          </tr>
          <tr>
            <td>Pyro</td>
            <td>1400</td>
            <td>
              <div className="units-sprite units-bozer_n"></div>
              <div className="units-sprite units-krill_n"></div>
              <div className="units-sprite units-pretorian_n"></div>
              <div className="units-sprite units-spider_n"></div>
              <div className="units-sprite units-toxic_n"></div>
              <div className="units-sprite units-eagle_n"></div>
              <div className="units-sprite units-fenix_n"></div>
              <div className="units-sprite units-kahuna_n"></div>
            </td>
            <td>Regicide</td>
            <td>Casual</td>
            <td><a href="#" className="btn btn-info">Join</a></td>
          </tr>
          <tr>
            <td>donbonifacio</td>
            <td>1500</td>
            <td>
              <div className="units-sprite units-rain_n"></div>
              <div className="units-sprite units-crusader_n"></div>
              <div className="units-sprite units-doomer_n"></div>
              <div className="units-sprite units-spider_n"></div>
              <div className="units-sprite units-toxic_n"></div>
            </td>
            <td>Regicide</td>
            <td>Casual</td>
            <td><a href="#" className="btn btn-info">Join</a></td>
          </tr>
        </tbody>
      </table>
    );
  }

});

module.exports = OpenGames;
