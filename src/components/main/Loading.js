import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const skeletonLoading = keyframes`
    0% {
        background-color: hsl(192, 0%, 85%);
    }
    100% {
        background-color: hsl(192, 0%, 97%);
    }
`
const skeletonLoadingImg = keyframes`
    0% {
        color: hsl(192, 0%, 85%);
    }
    100% {
        color: hsl(192, 0%, 97%);

    }
`

const Style = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    .card{
        height: 350px;
        width: 70%;
        max-width: 700px;
        box-shadow: 2px 0 15px -1px hsl(192, 0%, 80%), -2px 0 15px -1px hsl(192, 0%, 80%);
        padding: 30px;
        padding-bottom: 10px;
        margin-top: 30px;
        border-radius: 15px;
    }
    .skeleton{
        animation: ${skeletonLoading} 1s linear infinite alternate;
    }
    .skeletonImg{
        animation: ${skeletonLoadingImg} 1s linear infinite alternate;
    }
    .user{
        display: flex;
        align-items: center;
    }
    .column{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .photo{
        height: 50px;
        width: 50px;
        border-radius: 100%;
        margin-right: 10px;
    }
    .text{
        width: 100px;
        height: 15px;
        border-radius: 5px;
    }
    .sml-text{
        width: 150px;
        height: 10px;
        border-radius: 5px;
        margin-top: 5px;
    }
    .post{
        text-align: center;
        padding-bottom: 20px;
    }
    .image{
        font-size: 190px
    }
    .sml-text-img{
        width: 100%;
        height: 10px;
        border-radius: 5px;
        margin-top: 5px;
    }
    .sml-text-img:last-child{
        width: 80%;
    }
`;

const Loading = () => {
    return (
        <Style>
            <div className="card">
                <div className="user">
                    <div className="photo skeleton"></div>
                    <div className="column">
                        <div className="text skeleton"></div>
                        <div className="sml-text skeleton"></div>
                    </div>
                </div>
                <div className="post">
                    <FontAwesomeIcon icon={faImage} className="image skeletonImg"></FontAwesomeIcon>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                </div>
            </div>
            <div className="card">
                <div className="user">
                    <div className="photo skeleton"></div>
                    <div className="column">
                        <div className="text skeleton"></div>
                        <div className="sml-text skeleton"></div>
                    </div>
                </div>
                <div className="post">
                    <FontAwesomeIcon icon={faImage} className="image skeletonImg"></FontAwesomeIcon>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                </div>
            </div>
            <div className="card">
                <div className="user">
                    <div className="photo skeleton"></div>
                    <div className="column">
                        <div className="text skeleton"></div>
                        <div className="sml-text skeleton"></div>
                    </div>
                </div>
                <div className="post">
                    <FontAwesomeIcon icon={faImage} className="image skeletonImg"></FontAwesomeIcon>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                    <div className="sml-text-img skeleton"></div>
                </div>
            </div>
        </Style>
    )
};

export default Loading