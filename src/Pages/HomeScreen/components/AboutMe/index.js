import React, { useEffect, useRef, useState } from 'react'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'
import {
    CloseCircleOutlined,
    GithubOutlined,
    MediumOutlined,
    LinkedinOutlined
} from '@ant-design/icons'
import "./styles.sass"


const AboutMe = ({
    setAboutMeVisible
}) => {
    const { width } = useWindowDimensions();
    const mainBio =
        `My Name is Heshan Wickramaratne. I'm a 3rd year Software Engineering
        Undergraduate at University of Central Lancashire.`
    const myInterests = 
        `I love to code, create 3D art, Creative code and sometimes mix all these up.
        I also Blog my work afterwards`;

    return (
        <div className="about-me-outer-container">
            <div className="about-me-inner-container">
                <div className="close-button-container"
                    onClick={() => (setAboutMeVisible(false))}>
                    <CloseCircleOutlined />
                </div>
                <h2 className="title">About me...</h2>
                <p className="main-bio">{mainBio}</p>
                <p className="interests">{myInterests}</p>
                <hr />
                <div className="connect-with-me">
                    <label className='title'>
                        Lets Connect
                    </label>
                    <div className='container'>
                        <GithubOutlined />
                        <MediumOutlined />
                        <LinkedinOutlined/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe