"use strict";

var React = require('react');
var ProfileLink = require('../../components/common/ProfileLink.react.js');

var OpenGames = React.createClass({

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
            <td><ProfileLink username="ShadowKnight" /></td>
            <td>1400</td>
            <td>
              <div className="units-small-sprite units-small-raptor_n"></div>
              <div className="units-small-sprite units-small-nova_n"></div>
              <div className="units-small-sprite units-small-heavyseeker_n"></div>
            </td>
            <td>Regicide</td>
            <td>Casual</td>
            <td><a href="#" className="btn btn-info">Join</a></td>
          </tr>
          <tr>
            <td><ProfileLink username="Pyro" /></td>
            <td>1400</td>
            <td>
              <div className="units-small-sprite units-small-bozer_n"></div>
              <div className="units-small-sprite units-small-krill_n"></div>
              <div className="units-small-sprite units-small-pretorian_n"></div>
              <div className="units-small-sprite units-small-spider_n"></div>
              <div className="units-small-sprite units-small-toxic_n"></div>
              <div className="units-small-sprite units-small-eagle_n"></div>
              <div className="units-small-sprite units-small-fenix_n"></div>
              <div className="units-small-sprite units-small-kahuna_n"></div>
            </td>
            <td>Regicide</td>
            <td>Casual</td>
            <td><a href="#" className="btn btn-info">Join</a></td>
          </tr>
          <tr>
            <td><ProfileLink username="donbonifacio" /></td>
            <td>1500</td>
            <td>
              <div className="units-small-sprite units-small-rain_n"></div>
              <div className="units-small-sprite units-small-crusader_n"></div>
              <div className="units-small-sprite units-small-doomer_n"></div>
              <div className="units-small-sprite units-small-spider_n"></div>
              <div className="units-small-sprite units-small-toxic_n"></div>
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
