import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle, FaSearch, FaEdit, FaList } from 'react-icons/fa'
import { Link } from 'react-router-dom';

import './styles.css';

export default function Menu() {
const iconSize = 30;

    return (
        <nav id="mainNavbar">
            <ul>
                <li>
                    <Link to='/insert'><Button variant="light"><FaPlusCircle size={iconSize} /><span className="button-text">Insert</span></Button></Link>
                </li>
                <li>
                    <Link to='/edit'><Button variant="light"><FaEdit size={iconSize} /><span className="button-text">Edit</span></Button></Link>
                </li>
                <li>
                    <Link to='/delete'><Button variant="light"><FaMinusCircle size={iconSize} /><span className="button-text">Delete</span></Button></Link>
                </li>
                <li>
                    <Link to='/list'><Button variant="light"><FaList size={iconSize} /><span className="button-text">List All</span></Button></Link>
                </li>
                <li>
                    <Link to='/find'><Button variant="light"><FaSearch size={iconSize} /><span className="button-text">Find</span></Button></Link>
                </li>
            </ul>
        </nav>
    );
}
