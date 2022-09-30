import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { loadDetail } from "../actions/detailAction";
import { Link } from 'react-router-dom';
import { smolImg } from "../util";
import { popup } from "../animations";


const Game = ({ name, released, image, id }) => {
    const dispatch = useDispatch();
    const loadDetailHandler = () => {
        document.body.style.overflow = "hidden";   //after clicking any card to see the detail, the bg body(HOME) scrolling will be stopped.
        dispatch(loadDetail(id));
    };
    const stringId = id.toString();   //converting the id to string to match the both layoutId types also. (as pathId is a string)

    return (
        <StyledGame variants={popup} initial='hidden' animate='show' layoutId={stringId} onClick={loadDetailHandler}>   {/*framer motion requires both the components to have same layoutId*/}
            <Link to={`/game/${id}`}>
                <motion.h3 layoutId={`title ${stringId}`}>{name}</motion.h3>
                <p>{released}</p>
                <motion.img layoutId={`image ${stringId}`} src={smolImg(image, 640)} alt={name} />
                {/*using smolImg function to resize by manipulating the url when fetching*/}
                {/*as the img wasn't syncing with the animation, we simply make it motion.img and add layouts to the both img components*/}
            </Link>
        </StyledGame>
    );
};


const StyledGame = styled(motion.div)`
    min-height: 30vh;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 1rem;
    cursor: pointer;
    overflow: hidden;
    img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
    }
`;

export default Game;