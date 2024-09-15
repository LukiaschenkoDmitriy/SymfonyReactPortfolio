import "./SkillContent.scss";

import React, { CSSProperties, useContext, useEffect, useState } from "react";

import ReactLoading from 'react-loading';

import { AppContext } from "@app/app";
import { AppRouterInterface } from "@app/routers";

import { ContentProps } from "../FactoryContent";

import Card from "../collection-content/card/Card";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import ProgressBar from "../../progress-bar/ProgressBar";
import EmptyContent from "../../empty-content/EmptyContent";

import SkillEntity from "@data/SkillEntity";

import SkillRepository from "@repository/SkillRepository";

import i18nplus from "@services/TranslateService";
import { RouterService } from "@services/RouterService";

import skilBackground from "@images/skills-page/skills-bg.png";


const SkillContent: React.FC<ContentProps> = ({router}) => {

    document.title = router.name

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
    }, [appContext.appRouters, appContext.currentLanguage]);

    return (
        <div className="sr-content-inner sr-content-inner-skill" style={pageStyles}>
            {(skillData == undefined) ? (
                <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center content-loader">
                    <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
                </div>
            ) : (
                <div className="container my-5">
                <Breadcrumb router={router}/>
                    <section className="sr-content-page" id="skill-information">
                        <h1 className="title">{i18nplus(skillData.name, skillData.name)}</h1>
                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="description col-12 col-lg-6">
                                    <strong>{skillData.description}</strong>
                                </div>
                                <div className="image col-12 col-lg-6">
                                    <img src={skillData.icon} alt="Photo" />
                                </div>
                            </div>
                        </div>
                        <ProgressBar background="#fff" value={skillData.points} maxValue={10} textVisible={true} />
                    </section>
                    <section className="sr-content-page-add" id="skill-packages">
                        <h1 className="title">{i18nplus("skill.packages", "skill.packages")}</h1>
                        <div className="sr-about-container row">
                                {(RouterService.getSkillRoutesByIds(appContext.appRouters, skillData.subSkillIds)).map((skillRoute: AppRouterInterface) => (
                                    <Card key={skillRoute.name+"_skill_page"} router={skillRoute} background={skillRoute.background}/>
                                ))}

                                {skillData.subSkillIds.length == 0 ? (
                                    <EmptyContent text={i18nplus("skill.packages_empty", "skill.packages_empty")} />
                                ) : null}
                        </div>
                    </section>
                    <section className="sr-content-page-add" id="skill-projects">
                        <h1 className="title">{i18nplus("skill.projects", "skill.projects")}</h1>
                        <div className="sr-about-container row">
                                {(RouterService.getProjectRoutesByEntities(appContext.appRouters, skillData.projects)).map((projectRouter: AppRouterInterface) => (
                                    <Card key={projectRouter.name+"_skill_page"} router={projectRouter} background={projectRouter.background}/>
                                ))}

                                {skillData.projects.length == 0 ? (
                                    <EmptyContent text={i18nplus("skill.projects_empty", "skill.projects_empty")} />
                                ) : null}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default SkillContent;