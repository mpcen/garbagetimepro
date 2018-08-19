import React, { Component } from 'react';

import '../styles/Footer.css';

const date = new Date();
let year = date.getFullYear();

class Footer extends Component {
	render() {
		return (
			<div className="footer-container">
				<div className="copyright-container">
					<p>Copyright © {year} Garbage Time Pro</p>
					<div className="social-icons">
						<a href="http://twitter.com/garbagetimepro"><i className="fa fa-twitter" /></a>
						<a href="http://facebook.com/garbagetimepro"><i className="fa fa-facebook" /></a>
						<a href="http://instagram.com/garbagetimepro"><i className="fa fa-instagram" /></a>
					</div>
				</div>
			</div>
		);
	}
};

export default Footer;