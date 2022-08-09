import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Cell = ({ 
    row,
    column
}) => {
	const [content, setContent] = useState('');
    const onClick = (e) => {
        document.querySelectorAll('.cell').forEach((el) => {
            el.classList.remove('selected');
            el.classList.remove('editing');
            el.setAttribute('contenteditable', false);
        });
        e.target.classList.add('selected');
    }
    const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const onDblClick = (e) => {
        document.querySelectorAll('.cell').forEach((el) => {
            el.setAttribute('contenteditable', false);
            e.target.classList.remove('editing');
        });
        e.target.setAttribute('contenteditable', true);
        e.target.classList.add('editing');
        e.target.style.left = `${columns.indexOf(column) * (window.innerWidth/26)}px`;
        e.target.style.top = `${(row-1)*1.5}rem`;
        e.target.focus();
    }
    function setCursor(el, pos) {
          
        // Creates range object
        var setpos = document.createRange();
          
        // Creates object for selection
        var set = window.getSelection();
        console.log(pos);
        // Set start position of range
        setpos.setStart(el.childNodes[0], pos);
          
        // Collapse range within its boundary points
        // Returns boolean
        setpos.collapse(true);
          
        // Remove all ranges set
        set.removeAllRanges();
          
        // Add range with respect to range object.
        set.addRange(setpos);
          
        // Set cursor on focus
        el.focus();
    }
    const onChange = (e) => {
        setContent(e.target.textContent);
        setCursor(e.target, e.target.textContent.length);
        
    }
    

	return (
		<div className='cell' onClick={onClick} onDoubleClick={onDblClick} onInput={onChange} dangerouslySetInnerHTML={{__html: content}}></div>
	);
};

Cell.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Cell);
