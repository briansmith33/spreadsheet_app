import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Cell = ({ 
    row,
    column,
    defaultContent
}) => {
    const onClick = (e) => {
        if (!e.target.classList.contains('editing')) {
            document.querySelectorAll('.cell').forEach((el) => {
                el.classList.remove('selected');
                el.classList.remove('editing');
                el.setAttribute('contenteditable', false);
                el.style.marginRight = '0px'
            });
            e.target.classList.add('selected');
        }
        
    }
    const columns = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const onDblClick = (e) => {
        document.querySelector(`.cell-${columns.charAt(columns.indexOf(column)-1)}${row}`).style.marginRight = `${(window.innerWidth*0.9)/27}px`
        document.querySelectorAll('.cell').forEach((el) => {
            el.setAttribute('contenteditable', false);
            e.target.classList.remove('editing');
        });
        e.target.setAttribute('contenteditable', true);
        e.target.classList.add('editing');
        e.target.style.left = `${columns.indexOf(column) * ((window.innerWidth*0.9)/27)}px`;
        e.target.style.top = `${(row-1)*1.5}rem`;
        e.target.focus();
    }
    function setCursor(el, pos) {
        if (pos > 0) {
            var setpos = document.createRange();
          
            var set = window.getSelection();
            
            setpos.setStart(el.childNodes[0], pos);
            setpos.collapse(true);
            set.removeAllRanges();       
            set.addRange(setpos);        
            el.focus();
        }
        
    }

    const onChange = (e) => {
        e.target.innerHtml = `<span>${e.target.textContent}</span>`;
        setCursor(e.target, e.target.textContent.length);
    }
    
	return (
		<div className={`cell cell-${column}${row}`} onClick={onClick} onDoubleClick={onDblClick} onInput={onChange}>
            <span>{defaultContent ? defaultContent : ''}</span>
        </div>
	);
};

Cell.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Cell);
