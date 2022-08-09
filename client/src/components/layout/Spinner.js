import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleLoading } from '../../actions/page';

const Spinner = ({ loadFunctions, loading, toggleLoading, user: {user} }) => {
	
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		let isMounted = true;  
		var i = 1;
		loadFunctions.forEach(async (func) => {
			await func();
			isMounted && setProgress((100/(loadFunctions.length > 0 ? loadFunctions.length : 1))*i);
			i++;
		})
		return () => { isMounted = false };
	}, [loadFunctions]);
	/*
	useEffect(() => {
		if (loading) {
			if (progress >= 100) {
				toggleLoading();
			}
			const progress_bar = document.querySelector('.progress-bar');
			progress_bar.style.background = `conic-gradient(#1c7371 ${100 - progress}%, #08CCAC 0 ${progress}%)`;
			document.querySelector('.progress-bar').querySelector('span').innerHTML = progress + '%';
		}
		
	}, [progress, toggleLoading, loading]);
	*/

	const getCookie = (cName) => {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded.split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        return res;
    }

    
    useEffect(() => {
		const bg = getCookie('background');
		bg === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark');
    }, [])

	return (
		<Fragment>
			<div className='row spinner'>
				<h1>spinner page</h1>
			</div>
		</Fragment>
	);
};

Spinner.propTypes = {
	toggleLoading: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.page.loading,
	user: state.user
});

export default connect(mapStateToProps, {toggleLoading})(Spinner);
