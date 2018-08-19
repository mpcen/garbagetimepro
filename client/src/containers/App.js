import React, { Component } from 'react';
import ReactGA from 'react-ga';

import 'semantic-ui-css/semantic.min.css';
import '../styles/Fonts.css';
import '../styles/App.css';

import Main from './Main';
import Footer from '../components/Footer';

class App extends Component {
	constructor() {
		super();

		ReactGA.initialize('UA-108135013-1');
		ReactGA.pageview(window.location.pathname);
	}

	render() {
		return (
			<div className="app-container">				
				<Main />
				<Footer />
			</div>
		);
	}	
};

export default App;