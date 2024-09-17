import "./PersonalSkill.scss";

import React from "react";

// This file defines a PersonalSkill component for displaying an individual skill with its name and proficiency level.
// It takes `name` and `level` as props, where `name` is the skill's name and `level` is the proficiency rating out of 10.
// The component is styled to present the skill's name and level in a structured layout.

export interface PersonalSkillProps {
    name: string,
    level: number
}

const PersonalSkill: React.FC<PersonalSkillProps> = ({name, level}) => {
    return (
        <div className="sr-personal-skill-wrapper">
            <div className="sr-personal-skill row">
                <div className="name col-12 col-lg-6">
                    <strong>{name}</strong>
                </div>
                <div className="rate col-12 col-lg-6">
                    <strong>{level} / 10</strong>
                </div>
            </div>
        </div>
    )
}

export default PersonalSkill;