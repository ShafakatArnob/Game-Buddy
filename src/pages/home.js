import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";
import Game from "../components/game";
import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import GameDetail from "../components/GameDetail";
import {useLocation} from "react-router-dom";
import { fadeIn } from '../animations';


const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {dispatch(loadGames())}, [dispatch]);   //reducer receives whatever inside the dispatch() in its 'action' parameter. [here: reducer gets the whole loadGames() function]

    const { popular, newGames, upcoming, searched } = useSelector((state) => state.games);   //As, all the states are in reducer, I can get any states using useSelector()

    const location = useLocation();                    //gets the current location
    const pathId = location.pathname.split("/")[2];   //splitting to get only the game id


    return (
        <GameList variants={fadeIn} initial='hidden' animate='show'>   {/*these attributes are for animation. 'hidden' & 'show' are variables from animations.js file*/}

            <AnimateSharedLayout type="crossfade">
                <AnimatePresence>                               {/*AnimatePresence only work if it has a toggle(like pathId) ahead of the component*/}
                    {pathId && <GameDetail pathId={pathId} />   /*if pathId doesn't have any value, GameDetail will not load. Also passing it as props as framer-motion requires both the component to have layoutId*/}
                </AnimatePresence>

                {searched.length ? (
                    <div className="searched">
                        <h2>Searched Games</h2>
                        <Games>
                            {
                                searched.map((game) => (
                                    <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                                ))
                            }
                        </Games>
                    </div>
                ) : ("")}

                <h2>Upcoming Games</h2>
                <Games>
                    {
                        upcoming.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))
                    }
                </Games>

                <h2>Popular Games</h2>
                <Games>
                    {
                        popular.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))
                    }
                </Games>

                <h2>New Games</h2>
                <Games>
                    {
                        newGames.map((game) => (
                            <Game name={game.name} released={game.released} id={game.id} image={game.background_image} key={game.id} />
                        ))
                    }
                </Games>
            </AnimateSharedLayout>
        </GameList>
    );
}


const GameList = styled(motion.div)`
    padding: 0 5rem;
    h2{
        padding: 5rem 0;
    }
`;

const Games = styled(motion.div)`
    min-height: 80vh;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
    grid-column-gap: 3rem;
    grid-row-gap: 5rem;
`;

export default Home;