var React = require('react');

var Footer = React.createClass({
  render: function () {
    return (
      <footer>
        <div className="row">
          <div className="col-lg-12">
            <ul className="list-unstyled">
              <li className="pull-right"><a href="#top">Back to top</a></li>
              <li><a href="/">Home</a></li>
              <li><a href="http://status.orionsbelt.eu">Status</a></li>
              <li><a href="https://github.com/orionsbelt-battlegrounds">Source Code</a></li>
              <li><a href="https://github.com/orionsbelt-battlegrounds/api">API</a></li>
            </ul>
            <p>Orion's Belt: chess-like battle system with a powerful twist!</p>
            <p>Made by <a href="https://github.com/orgs/orionsbelt-battlegrounds/people">an awesome team</a>. Contact them at <a href="mailto:business@orionsbelt.eu">business@orionsbelt.eu</a>.</p>
            <p>Based on <a href="http://bootswatch.com/slate/" rel="nofollow">Slate</a>'s theme.</p>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
