import React from 'react';
import { Button } from "semantic-ui-react";

import '../styles/Footer.css';

const date = new Date();
let year = date.getFullYear();

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="copyright-container">
				<p>Copyright © {year} Garbage Time Pro</p>
				
				<div className="social-icons">
					<a className="donate-link" href="https://www.paypal.me/mmdevs">
						<i className="fa fa-paypal" />
						&nbsp;Donate
					</a>
					{/* <span style={{fontSize: '16px'}}>|</span>
					<a href="http://twitter.com/garbagetimepro"><i className="fa fa-twitter" /></a>
					<a href="http://facebook.com/garbagetimepro"><i className="fa fa-facebook" /></a>
					<a href="http://instagram.com/garbagetimepro"><i className="fa fa-instagram" /></a> */}
				</div>
			</div>
		</div>
	);
};

export default Footer;