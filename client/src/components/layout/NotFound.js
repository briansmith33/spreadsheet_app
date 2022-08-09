import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleLoading } from '../../actions/page';

const NotFound = ({toggleLoading, loading}) => {
	toggleLoading();
	/*
	useEffect(() => {
		if (!loading) {
			if (darkMode) {
				document.querySelector('#not-found-error').querySelectorAll('span').forEach((el) => {
					el.style.color = "#ffffff";
				});
				document.querySelector('#not-found-header').style.color = "#ffffff";
				document.querySelector('#not-found-message').style.color = "#ffffff";
			}else{
				document.querySelector('#not-found-error').querySelectorAll('span').forEach((el) => {
					el.style.color = "#343a40";
				});
				document.querySelector('#not-found-header').style.color = "#343a40";
				document.querySelector('#not-found-message').style.color = "#343a40";
			}
		}
	}, [darkMode, loading])
	*/
	return (
		<Fragment>
			<div className='row'>
				<div id='not-found-error'>
					<span>4</span>
					<span>0</span>
					<span>4</span>
				</div>
				<h1 id='not-found-header'>Page Not Found!</h1>
				<p id='not-found-message'>Sorry, this page does not exist.</p>

			</div>
		</Fragment>
	);
};

NotFound.propTypes = {
	toggleLoading: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};


const mapStateToProps = (state) => ({
	loading: state.page.loading,
});

export default connect(mapStateToProps, {toggleLoading})(NotFound);
