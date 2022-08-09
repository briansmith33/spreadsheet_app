import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import SideBar from './SideBar';
import Cell from './Cell';


const Editor = ({ isAuthenticated, user: { loading }, auth  }) => {
    /*
	useEffect(() => {
        const alphabet = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 27; i++) {
            const alphaHeader = document.createElement('th');
            alphaHeader.textContent = alphabet.charAt(i);
            document.querySelector('#column-headers').appendChild(alphaHeader);
        }
        for (let i = 1; i <= 50; i++) {
            const row = document.createElement('tr');
            const numHeader = document.createElement('th');
            numHeader.textContent = i;
            row.appendChild(numHeader);
            for (let j = 0; j < 26; j++) {
                const cell = document.createElement('td');
                row.appendChild(cell);
            }
            document.querySelector('tbody').appendChild(row);
        }
    }, [])
    */

    const [cells, setCells] = useState([]);
    const [csvContent, setCsv] = useState(null);
    useEffect(() => {
        if (cells.length > 0) {
            let csv = []
            let spans = document.querySelectorAll('.cell');
            let index = 0;
            for (let i = 0; i < 50; i++) {
                csv.push([]);
                for (let j = 0; j < 26; j++) {
                    csv[i].push(spans[index].textContent);
                    index++;
                }
            }

            setCsv("data:text/csv;charset=utf-8," + csv.map(e => e.join(",")).join("\n"));
        }
        
    }, [cells, setCsv]);

    useEffect(() => {
        const alphabet = " ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 27; i++) {
            const columnHeader = document.createElement('span');
            columnHeader.classList.add('column-header');
            columnHeader.textContent = alphabet.charAt(i);
            document.querySelector('#column-headers').appendChild(columnHeader);
        }
        let index = 0;
        let tempCells = [];
        for (let i = 1; i <= 50; i++) {
            const headerRow = document.createElement('div');
            headerRow.classList.add('row');
            const rowHeader = document.createElement('span');
            rowHeader.textContent = i;
            rowHeader.classList.add('row-header');
            headerRow.appendChild(rowHeader);
            const cellRow = document.createElement('div');
            cellRow.classList.add('row');

            tempCells.push([]);
            for (let j = 0; j < 26; j++) {
                tempCells[i-1].push(<Cell key={index} row={i} column={intToChar(j)} />);
                index++;
            }
            setCells(tempCells);
            document.querySelector('#row-headers').appendChild(headerRow);
            document.querySelector('#cells').appendChild(cellRow);
        }

    }, [setCells])

    const intToChar = (int) => String.fromCharCode('A'.charCodeAt(0) + int);


	return auth.loading ? (
		<Spinner loadFunctions={[]} />
	) : (
		<div id='editor-page' className='page'>
            <SideBar csvContent={csvContent} />
            <div id='table'>
                <div id='column-headers' className='row'></div>
                <div id='row-headers' className='row'></div>
                <div id='cells' className='row'>{cells}</div>
            </div>
            {/*<table id="spreadsheet">
                <thead>
                    <tr id="column-headers"></tr>
                </thead>
                <tbody>

                </tbody>
    </table>*/}
		</div>
	);
};

Editor.propTypes = {
	
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	auth: state.auth,
	user: state.user,
});

export default connect(mapStateToProps, {

})(Editor);
