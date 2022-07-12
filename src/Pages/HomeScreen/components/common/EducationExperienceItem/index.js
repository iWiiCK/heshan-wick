import React, { useEffect, useRef, useState } from 'react'
import "./styles.sass";

const EducationExperienceItem = ({ children, org, orgLink, duration, designation }) => {

    const Org = ({ org }) => {
        if (orgLink) return <a href={orgLink}>{org}</a>
        return <span >{org}</span>
    }

    const displayWork = (workString) => {
        const works = workString.split("||");

        return works.map((work, i) => {
            return <li key={i}>{work}</li>
        })
    }
    return (
        <div className='education-experience-item-component-container'>
            <div className="inner-component-container">
                <div className='header'>
                    <label className='org'>{<Org org={org} orgLink={orgLink} />}{`,${designation}`}</label>
                </div>
                <div className='duration'>
                    <label >{duration}</label>
                </div>
                <div>
                    <ul>
                        {displayWork(children)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default EducationExperienceItem