import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

import { SocialIcon } from "react-social-icons";
import {
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
  XdLine,
  SlackOriginal,
  AmazonwebservicesOriginal,
  AzureOriginal,
  GooglecloudOriginal,
  GoOriginalWordmark,
  NestjsPlain,
  MongodbOriginal,
  PostgresqlPlain,
  FirebasePlainWordmark,
  DockerPlain,
  TypescriptOriginal,
  JavascriptOriginal,
} from "devicons-react";

import EducationExperienceItem from "../common/EducationExperienceItem";

import "./styles.sass";

const AboutMe = ({ setAboutMeVisible }) => {
  const mainBio = `My Name is Heshan Wickramaratne. I'm a BSc. First Class (Hons) in Software Engineering
        Graduate from the University of Central Lancashire (UK).`;
  const myInterests = `I love to code, create 3D art, Creative code and sometimes mix all these up.
        I also Blog my work afterwards`;

  return (
    <div className="about-me-outer-container">
      <div className="about-me-inner-container">
        <div
          className="close-button-container"
          onClick={() => setAboutMeVisible(false)}
        >
          <CloseCircleOutlined />
        </div>
        <section className="about-me-section">
          <h2 className="title">About me...</h2>
          <p className="main-bio">{mainBio}</p>
          <p className="interests">{myInterests}</p>
          <hr />
        </section>
        <section className="connect-with-me-section">
          <label className="title">Let's Connect</label>
          <div className="flex-container">
            <SocialIcon
              network="github"
              bgColor="white"
              url="https://github.com/iWiiCK"
            />
            <SocialIcon
              network="linkedin"
              bgColor="white"
              url="https://www.linkedin.com/in/heshan-wickramaratne/"
            />

            <SocialIcon
              network="stackoverflow"
              bgColor="white"
              url="https://stackoverflow.com/users/13370488/iwiick"
            />
            <SocialIcon
              network="medium"
              bgColor="white"
              url="https://medium.com/@iwiick"
            />
            <SocialIcon
              network="instagram"
              bgColor="white"
              url="https://www.instagram.com/iwiick"
            />
          </div>
          <hr />
        </section>
        <section className="experience-section">
          <label className="title">Experience</label>
          <div>
            <EducationExperienceItem
              org="Insighture"
              designation="Software Engineer (Full-Stack)"
              duration="Present"
            >
              {`Full stack development with Nest.js, React, AWS and Go lang`}
            </EducationExperienceItem>
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
          <label className="title">Programming Languages</label>
          <div className="flex-container">
            <JavascriptOriginal className="iwiick-icons" />
            <TypescriptOriginal className="iwiick-icons" />
            <Html5OriginalWordmark className="iwiick-icons" />
            <Css3PlainWordmark className="iwiick-icons" />
            <JavaOriginalWordmark className="iwiick-icons" />
            <CplusplusOriginal className="iwiick-icons" />
            <CsharpOriginal className="iwiick-icons" />
            <GoOriginalWordmark className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="frameworks-section">
          <label className="title">Frameworks</label>
          <div className="flex-container">
            <AndroidPlainWordmark className="iwiick-icons" />
            <NodejsOriginal className="iwiick-icons" />
            <ReactOriginalWordmark className="iwiick-icons" />
            <ReduxOriginal className="iwiick-icons" />
            <ThreejsOriginal className="iwiick-icons" />
            <div className="invert">
              <UnityOriginal className="iwiick-icons" />
            </div>
            <NestjsPlain className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="Cloud-section">
          <label className="title">Cloud</label>
          <div className="flex-container">
            <AmazonwebservicesOriginal className="iwiick-icons" />
            <AzureOriginal className="iwiick-icons" />
            <GooglecloudOriginal className="iwiick-icons" />
            <DockerPlain className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="DB-section">
          <label className="title">Databases</label>
          <div className="flex-container">
            <MongodbOriginal className="iwiick-icons" />
            <PostgresqlPlain className="iwiick-icons" />
            <FirebasePlainWordmark className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="version-controlling-section">
          <label className="title">Version Controlling</label>
          <div className="flex-container">
            <GitPlainWordmark className="iwiick-icons" />
            <GithubOriginal className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="designing-section">
          <label className="title">3D modelling & Designing</label>
          <div className="flex-container">
            <BlenderOriginal className="iwiick-icons" />
            <FigmaOriginal className="iwiick-icons" />
            <IllustratorLine className="iwiick-icons" />
            <PhotoshopLine className="iwiick-icons" />
            <XdLine className="iwiick-icons" />
            <SassOriginal className="iwiick-icons" />
          </div>
          <hr />
        </section>
        <section className="project-management-section">
          <label className="title">Project Management</label>
          <div className="flex-container">
            <JiraOriginal className="iwiick-icons" />
            <TrelloPlain className="iwiick-icons" />
            <SlackOriginal className="iwiick-icons" />
          </div>
          <hr />
        </section>
      </div>
    </div>
  );
};

export default AboutMe;
