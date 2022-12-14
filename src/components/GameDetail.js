import React from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { smolImg } from "../util";
import playstation from "../img/playstation.svg";
import steam from "../img/steam.svg";
import xbox from "../img/xbox.svg";
import nintendo from "../img/nintendo.svg";
import apple from "../img/apple.svg";
import gamepad from "../img/gamepad.svg";
import starEmpty from "../img/star-empty.png";
import starFull from "../img/star-full.png";


const GameDetail = ({pathId}) =>{
    const { screen, game, isLoading } = useSelector((state) => state.detail);
    const navigate = useNavigate();

    const exitDetailHandler = (e) =>{
        const element = e.target;                         //i want to check where i clicked.
        if(element.classList.contains("card-shadow")){   //checking if i clicked outside of the detail( which is HOME).
            document.body.style.overflow = 'auto';
            navigate("/");                              //also setting the route back to HOME.
        }
    }

    const getPlatform = (platform) => {
        switch(platform){
            case "PlayStation 4":
                return playstation;
            case "Xbox One":
                return xbox;
            case "Nintendo Switch":
                return nintendo;
            case "iOS":
                return apple;
            case "PC":
                return steam;
            default:
                return gamepad;
        }
    }

    const getStars = () => {
        const stars = [];
        const rating = Math.floor(game.rating);
        for(let i=1; i<=5; i++){
            if(i <= rating){
                stars.push(<img key={i} src={starFull} alt="" />);
            }
            else{
                stars.push(<img key={i} src={starEmpty} alt="" />);
            }
        }

        return stars;
    }

    return(
        <>
        {!isLoading && (
        <CardShadow className="card-shadow" onClick={exitDetailHandler}>
            <Detail layout={pathId}>   {/*framer motion requires both the components to have same layoutId*/}
                <Stats>
                    <div className="rating">
                        <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                        <p>Rating: {game.rating}</p>
                        {getStars()}
                    </div>
                    <Info>
                        <h3>Platforms</h3>
                        <Platforms>
                            {
                                game.platforms.map((data) =>(
                                    <img key={data.platform.id} src={getPlatform(data.platform.name)} alt="" />
                                ))
                            }
                        </Platforms>
                    </Info>
                </Stats>
                <Media>
                    <motion.img layoutId={`image ${pathId}`} src={smolImg(game.background_image, 1280)} alt="" />   {/*using smolImg function to resize by manipulating the url when fetching*/}
                </Media>                                                                                            {/*as the img wasn't syncing with the animation, we simply make it motion.img and add layouts to the both img components*/}
                <Description>
                    <p>{game.description_raw}</p>
                </Description>
                <div className="gallery">
                    {screen.results.map((screen) =>(
                        <img src={smolImg(screen.image, 1280)} key={screen.id} alt="" />
                    ))}
                </div>
            </Detail>
        </CardShadow>
        )}
        </>
    )
}


const CardShadow = styled(motion.div)`
    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    background: rgb(0,0,0,0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #ff7676;
    }
    &::-webkit-scrollbar-track{
        background: white;
    }
`;

const Detail = styled(motion.div)`
    width: 80%;
    border-radius: 1rem;
    padding: 2rem 5rem;
    background: white;
    position: absolute;
    left: 10%;
    color: black;
    z-index: 10;
    img{
        width: 100%;
    }
`;

const Stats = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    img{
        width: 2rem;
        height: 2rem;
        display: inline;
    }
`;

const Info = styled(motion.div)`
    text-align: center;
`;

const Platforms = styled(motion.div)`
    display: flex;
    justify-content: space-evenly;
    img{
        margin-left: 3rem;
    }
`;

const Media = styled(motion.div)`
    margin-top:5rem;
    img{
        width: 100%;
    }
`;

const Description = styled(motion.div)`
    margin:5rem 0;
`;

export default GameDetail;