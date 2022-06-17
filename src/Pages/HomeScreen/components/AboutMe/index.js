import React from 'react'
import {
    CloseCircleOutlined,
} from '@ant-design/icons'

import { SocialIcon } from 'react-social-icons';
import {
    JavascriptPlain,
    Html5OriginalWordmark,
    Css3PlainWordmark,
    JavaOriginalWordmark,
    CplusplusOriginal,
    CsharpOriginal,
    AndroidPlainWordmark,
    BlenderOriginal,
    FigmaOriginal,
    GitPlainWordmark,
    GithubOriginal,
    IllustratorLine,
    JiraOriginal,
    NodejsOriginal,
    PhotoshopLine,
    ReactOriginalWordmark,
    ReduxOriginal,
    SassOriginal,
    ThreejsOriginal,
    TrelloPlain,
    UnityOriginal,
    XdLine
} from 'devicons-react'

import EducationExperienceItem from '../common/EducationExperienceItem';

import "./styles.sass"


const AboutMe = ({
    setAboutMeVisible
}) => {
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
                <section className='about-me-section'>
                    <h2 className="title">About me...</h2>
                    <p className="main-bio">{mainBio}</p>
                    <p className="interests">{myInterests}</p>
                    <hr />
                </section>
                <section className="connect-with-me-section">
                    <label className='title'>
                        Let's Connect
                    </label>
                    <div className='flex-container'>
                        <SocialIcon
                            network="github"
                            bgColor='white'
                            url="https://github.com/iWiiCK" />
                        <SocialIcon
                            network="linkedin"
                            bgColor='white'
                            url='https://www.linkedin.com/in/heshan-wickramaratne/' />

                        <SocialIcon
                            network="stackoverflow"
                            bgColor='white'
                            url='https://stackoverflow.com/users/13370488/iwiick' />
                        <SocialIcon
                            network="medium"
                            bgColor='white'
                            url='https://medium.com/@iwiick' />
                        <SocialIcon
                            network="instagram"
                            bgColor='white'
                            url='https://www.instagram.com/iwiick' />
                    </div>
                    <hr />
                </section>
                <section className="experience-section">
                    <label className='title'>
                        Experience
                    </label>
                    <div>
                        <EducationExperienceItem
                            org="99x"
                            designation="Trainee Software Engineer (Full-Stack)"
                            duration="2021-2022"
                        >
                            {`
                            Awarded, "Excellence Award for the Most Outstanding Intern"||

                            Front-end: Developed and extended UIs with React, React-Native, Redux, AntD along with a variety
                             of different libraries||

                            Back-end: Developed, improved and extended functionalities using Node.js, AWS services along with 
                            Serverless Framework
                            `}
                        </EducationExperienceItem>
                    </div>
                    <hr />
                </section>
                <section className="programming-languages-section">
                    <label className='title'>
                        Programming Languages
                    </label>
                    <div className='flex-container'>
                        <JavascriptPlain />
                        <Html5OriginalWordmark />
                        <Css3PlainWordmark />
                        <JavaOriginalWordmark />
                        <CplusplusOriginal />
                        <CsharpOriginal />
                    </div>
                    <hr />
                </section>
                <section className="frameworks-section">
                    <label className='title'>
                        Frameworks
                    </label>
                    <div className='flex-container'>
                        <AndroidPlainWordmark />
                        <NodejsOriginal />
                        <ReactOriginalWordmark />
                        <ReduxOriginal />
                        <ThreejsOriginal />
                        <div className="invert">
                            <UnityOriginal />
                        </div>
                    </div>
                    <hr />
                </section>
                <section className="version-controlling-section">
                    <label className='title'>
                        Version Controlling
                    </label>
                    <div className='flex-container'>
                        <GitPlainWordmark />
                        <GithubOriginal />
                    </div>
                    <hr />
                </section>
                <section className="designing-section">
                    <label className='title'>
                        3D modelling & Designing
                    </label>
                    <div className='flex-container'>
                        <BlenderOriginal />
                        <FigmaOriginal />
                        <IllustratorLine />
                        <PhotoshopLine />
                        <XdLine />
                        <SassOriginal />
                    </div>
                    <hr />
                </section>
                <section className="project-management-section">
                    <label className='title'>
                        Project Management
                    </label>
                    <div className='flex-container'>
                        <JiraOriginal />
                        <TrelloPlain />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AboutMe