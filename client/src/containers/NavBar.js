import React, { Component } from 'react';
import { Icon, Modal, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { searchLeagueOffice } from '../actions/searchLeagueOfficeActions';
import LeagueSearchBar from './LeagueSearchBar';
import history from '../utils/historyUtil';
import '../styles/NavBar.css';

class NavBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isHome: true
		};

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		if(history.location.pathname === '/') {
			this.setState({
				isHome: true
			});
		} else {
			this.setState({
				isHome: false
			});
		}
	}

	componentWillReceiveProps(nextProps) {
		if(history.location.pathname === '/') {
			this.setState({
				isHome: true
			});
		} else {
			this.setState({
				isHome: false
			});
		}
	}

	handleClick() {
		this.props.searchLeagueOffice(null, this.props.text);
	}

	renderHeader() {
		if(this.props.loading) {
			return (
				<h1 className="navbar-appname">
					GARBAGE TIME PRO
				</h1>
			);
		}

		return (
			<Link to="/">
				<h1 className="navbar-appname" onClick={() => this.setState({ isHome: true })}>
					GARBAGE TIME PRO
				</h1>
			</Link>
		);
	}

	handleModalRender() {
		if(this.props.loading) {
			return false;
		}
	}

	render() {
		return (
			<nav className="nav-container">
				{this.renderHeader()}
				<Modal
					className="navbar-modal"
					trigger={
						<Icon
							className={`navbar-search-icon ${this.state.isHome === true ? 'search-icon-hidden' : 'search-icon-visible'}`}
							name="search"
							size="big"
						/>
					}
					closeIcon
					open={this.handleModalRender()}
				>
					<Modal.Header>Search for a different league</Modal.Header>
					
					<Modal.Content>
						<Modal.Description>
							<LeagueSearchBar />
						</Modal.Description>
					</Modal.Content>

					<Modal.Actions className="modal-actions-container">
						<Button
							className="home-search-button"
							onClick={this.handleClick}
							size="large"
						>
							Search
						</Button>
					</Modal.Actions>
				</Modal>			
			</nav>
		);
	};
};

const mapStateToProps = state => {	
	return {
		loading: state.searchLeagueOffice.loading,
		text: state.searchLeagueOffice.text,
		error: state.searchLeagueOffice.error
	}
}

export default connect(mapStateToProps, { searchLeagueOffice })(NavBar);