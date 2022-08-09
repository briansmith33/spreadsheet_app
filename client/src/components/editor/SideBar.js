import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {saveSpreadsheet} from '../../actions/user';


const SideBar = ({ isAuthenticated, user: { loading }, auth, csvContent  }) => {
	
    const onSave = (e) => {

    }

    const onDownload = (e) => {
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "spreadsheet.csv");
        document.body.appendChild(link); // Required for FF

        link.click(); 
    }

    const onFileOpen = (e) => {
        console.log(e.target.files[0]);
    }

	return (
		<div id='sidebar'>
            <button className='sidebar-btn'><i className="fa-solid fa-circle-plus" />New</button>
            <button className='sidebar-btn'><i className="fa-solid fa-folder-open" />Open</button>
            <input type="file" id='file-input' onChange={onFileOpen} accept='.csv'></input>
            <label className='sidebar-btn' htmlFor='file-input'><i class="fa-solid fa-file-import"></i>Import</label>
            <button className='sidebar-btn' onClick={onSave}><i className="fa-solid fa-floppy-disk" />Save</button>
            <button className='sidebar-btn' onClick={() => window.print()}><i className="fa-solid fa-print" />Print</button>
            <button className='sidebar-btn' onClick={onDownload}><i className="fa-solid fa-download" />Download</button>
		</div>
	);
};

SideBar.propTypes = {
	
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {

})(SideBar);
