import "./PersonalSkill.scss";

import React from "react";

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