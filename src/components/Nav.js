import React, {useState} from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import logo from "../img/logo.svg";
import { useDispatch } from "react-redux";
import { fetchSearch } from "../actions/gamesAction";
import { fadeIn } from '../animations';


const Nav = () =>{

    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");

    const searchInputHandler = (e) =>{
        setSearchInput(e.target.value);   //this will get that event's targetted value, where this function is triggered.
    }

    const submitSearch = (e) =>{
        e.preventDefault();
        dispatch(fetchSearch(searchInput));
        setSearchInput("");
    }

    const clearSearched = () =>{
        dispatch({ type: "CLEAR_SEARCHED"});
    }


    return(
        <StyledNav variants={fadeIn} initial='hidden' animate='show'>   {/*these attributes are for animation. 'hidden' & 'show' are variables from animations.js file*/}
            <Logo onClick={clearSearched}>
                <img src={logo} alt="" />
                <h1>Game Buddy</h1>
            </Logo>
            <form className="search">
                <input value={searchInput} onChange={searchInputHandler} type="text" />
                <button onClick={submitSearch} type="submit">Search</button>
            </form>
        </StyledNav>
    )
}

const StyledNav = styled(motion.div)`
    padding: 3rem 5rem;
    text-align: center;
    input{
        width: 30%;
        font-size: 1.5rem;
        padding: 0.5rem;
        border: none;
        margin-top: 1rem;
        box-shadow: 0 0 30px rgba(0,0,0,0.2);
    }
    button{
        font-size: 1.5rem;
        border: none;
        padding: 0.5rem 2rem;
        cursor: pointer;
        color: white;
        background: #ff7676;
    }
`;

const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 1rem;
    cursor: pointer;
    img{
        height: 2rem;
        width: 2rem;
    }
`;

export default Nav;