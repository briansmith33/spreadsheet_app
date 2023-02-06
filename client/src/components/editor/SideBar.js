import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTable } from '../../actions/user';
import { Navigate } from 'react-router-dom';


const SideBar = ({ isAuthenticated, user: { loading }, auth, csvContent, saveTable, setImportFile  }) => {
	
    const [tableData, setTableData] = useState({
        file_name: "",
        csv: csvContent,
    })

    const {
        csv,
        file_name
    } = tableData;

    const saveDialog = document.querySelector('.save-dialog');

    useEffect(() => setTableData({...tableData, csv: csvContent}), [setTableData, csvContent]);
    const onChange = (e) => setTableData({...tableData, [e.target.name]: e.target.value});
    
    const onClick = (action) => {
        if (action === 'save') saveTable(tableData);
        setTableData({
            file_name: "",
            csv: csvContent,
        })
        saveDialog.classList.remove('show');
    }

    const closeDialog = () => saveDialog.classList.remove('show');
    const onSave = () => {
        if (isAuthenticated) saveDialog.classList.add('show');
        else window.location.href = '/signin';
    }  
    
    const onDownload = (e) => {
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "spreadsheet.csv");
        document.body.appendChild(link); // Required for FF
        link.click(); 
    }

    const onFileOpen = async (e) => {
        const fileContent = await readFile(e.target.files[0]);
        setImportFile(window.atob(fileContent).replaceAll("\n", ",").split(','));
    }

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                resolve(fileReader.result.split(/base64,/)[1]);
            };
            fileReader.onerror = () => {
                reject(fileReader.error);
            };
            fileReader.readAsDataURL(file);
        });
    }

	return (
        <Fragment>
            <div id='sidebar'>
                <button className='sidebar-btn'><i className="fa-solid fa-circle-plus" /><span>New</span></button>
                <button className='sidebar-btn'><i className="fa-solid fa-folder-open" /><span>Open</span></button>
                <input type="file" id='file-input' onChange={onFileOpen} accept='.csv'></input>
                <label className='sidebar-btn' htmlFor='file-input'><i className="fa-solid fa-file-import" /><span>Import</span></label>
                <button className='sidebar-btn' onClick={onSave}><i className="fa-solid fa-floppy-disk" /><span>Save</span></button>
                <button className='sidebar-btn' onClick={() => window.print()}><i className="fa-solid fa-print" /><span>Print</span></button>
                <button className='sidebar-btn' onClick={onDownload}><i className="fa-solid fa-download" /><span>Download</span></button>
            </div>
            <div className='save-dialog'>
                <i className="fa-solid fa-circle-xmark close-btn" onClick={closeDialog} />
                <input type='text' name="file_name" placeholder='File name' value={file_name} onChange={onChange} />
                <button className='save-btn' onClick={() => onClick('save')}>Save</button>
                <button className='cancel-btn' onClick={() => onClick('cancel')}>Cancel</button>
            </div>
        </Fragment>
		
	);
};

SideBar.propTypes = {
	saveTable: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {
    saveTable
})(SideBar);
