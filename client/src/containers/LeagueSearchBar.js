import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon } from 'semantic-ui-react';
import '../styles/LeagueSearchBar.css';

import {
	updateSearchLeagueText,
	searchLeagueOffice
} from '../actions/searchLeagueOfficeActions';

class LeagueSearchBar extends Component {
	constructor(props) {
		super(props);

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleTextChange(event) {
		this.props.updateSearchLeagueText(event.target.value);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.searchLeagueOffice(null, this.props.text);
	}

	render() {
		return (
			<Form
				onSubmit={this.handleSubmit}
				error={this.props.error.length > 0}
				className="league-search-bar-container"
			>				
				<Form.Input
					className="leagueoffice-searchbar"
					disabled={this.props.loading}
					value={this.props.text}
					onChange={this.handleTextChange}
					placeholder={this.props.error.length > 0 ? this.props.error : "Try \"1246423\""}
					error={this.props.error.length > 0}					
				/>	

				<Icon
					className="league-search-bar-remove"
					style={{display: `${this.props.text.length > 0 ? 'inline-block' : 'none'}`}}
					name="remove"
					size="large"
					onClick={() => this.props.updateSearchLeagueText('')}
				/>
			</Form>
		);
	}
};

const mapStateToProps = state => {
	return {
		text: state.searchLeagueOffice.text,
		error: state.searchLeagueOffice.error,
		loading: state.searchLeagueOffice.loading
	};
}

export default connect(
	mapStateToProps, 
	{ updateSearchLeagueText, searchLeagueOffice }
)(LeagueSearchBar);