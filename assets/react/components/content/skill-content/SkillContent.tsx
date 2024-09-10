import "./SkillContent.scss";

import React, { CSSProperties, useContext, useEffect, useState } from "react";

import ReactLoading from 'react-loading';

import { AppContext } from "@app/app";

import { ContentProps } from "../FactoryContent";

import Breadcrumb from "@components/breadcrumb/Breadcrumb";

import SkillRepository from "@repository/SkillRepository";

import SkillEntity from "@data/SkillEntity";

import i18nplus from "@services/TranslateService";

import skilBackground from "@images/skills-page/skills-bg.png";
import ProgressBar from "../utils/progress-bar/ProgressBar";

const SkillContent: React.FC<ContentProps> = ({router}) => {

    const appContext = useContext(AppContext);
    const [skillData, setSkillData] = useState<SkillEntity>();

    const pageStyles: CSSProperties = {
        background: `url('${skilBackground}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    useEffect(() => {
        (async() => {
            (router.id) ? setSkillData(await new SkillRepository().findById(router.id, appContext.currentLanguage)) : null;
        })();
    }, []);

    return (
        <div className="sr-content-inner sr-content-inner-skill" style={pageStyles}>
            {(skillData == undefined) ? (
                <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center">
                    <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
                </div>
            ) : (
                <div className="container my-5">
                <Breadcrumb router={router} />
                    <section className="sr-about-content sr-content-page" id="skill-information">
                        <h1 className="title">{i18nplus(skillData.name, skillData.name)}</h1>
                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="description col-12 col-lg-6">
                                    <strong>{skillData.description}</strong>
                                </div>
                                <div className="image col-12 col-lg-6">
                                    <img src={"/"+skillData.icon} alt="Photo" />
                                </div>
                            </div>
                        </div>
                        <ProgressBar background="#fff" value={skillData.points} maxValue={10} textVisible={true} />
                    </section>
                    <section className="sr-about-content sr-content-page" id="skill-packages">
                        <h1 className="title">{i18nplus("skill.packages", "skill.packages")}</h1>
                        <div className="sr-about-container">

                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default SkillContent;