import "./ExperienceContent.scss";

import React, { CSSProperties, useContext, useEffect, useState } from "react";

import { ContentProps } from "../FactoryContent";
import i18nplus from "@services/TranslateService";
import ExperienceEntity from "@data/ExperienceEntity";

import experienceBacgrkound from "@images/experiences-page/experience-bg.png";
import ExperienceRepository from "@repository/ExperienceRepository";
import { AppContext } from "@app/app";
import ReactLoading from "react-loading";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import { RouterService } from "@services/RouterService";
import Card from "../collection-content/card/Card";
import { AppRouterInterface } from "@app/routers";
import EmptyContent from "@components/empty-content/EmptyContent";

const ExperienceContent: React.FC<ContentProps> = ({router}) => {
    document.title = i18nplus(router.name, router.name);

    const appContext = useContext(AppContext);
    const [experienceData, setExperienceData] = useState<ExperienceEntity>();

    const pageStyles: CSSProperties = {
        background: `url('${experienceBacgrkound}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    useEffect(() => {
        (async() => {
            (router.id) ? setExperienceData(await new ExperienceRepository().findById(router.id, appContext.currentLanguage)) : null;
        })();
    }, [appContext.appRouters, appContext.currentLanguage]);

    return (
        <div className="sr-content-inner sr-content-inner-experience" style={pageStyles}>
            {(experienceData == undefined) ? (
                <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center content-loader">
                    <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
                </div>
            ) : (
                <div className="container my-5">
                <Breadcrumb router={router}/>
                    <section className="sr-content-page" id="experience-information">
                        <h1 className="title">{i18nplus(experienceData.name, experienceData.name)}</h1>

                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="description col-12 col-lg-6">
                                    <strong>{experienceData.description}</strong>
                                </div>
                                <div className="image col-12 col-lg-6">
                                    <h2>{experienceData.role}</h2>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="sr-content-page-add" id="experience-skills">
                        <h1 className="title">{i18nplus("experience.skills", "experience.skills")}</h1>
                        <div className="sr-about-container row">
                            {(RouterService.getSkillsRoutesByEntities(appContext.appRouters, experienceData.skills)).map((skillRouter: AppRouterInterface) => (
                                <Card key={skillRouter.name+"_experience_page"} router={skillRouter} background={skillRouter.background}/>
                            ))}

                            {experienceData.skills.length == 0 ? (
                                <EmptyContent text={i18nplus("experience.skills_empty", "experience.skills_empty")} />
                            ) : null}
                        </div>
                    </section>
                    <section className="sr-content-page-add" id="experience-projects">
                        <h1 className="title">{i18nplus("experience.projects", "experience.projects")}</h1>
                        <div className="sr-about-container row">
                            {(RouterService.getProjectRoutesByEntities(appContext.appRouters, experienceData.projects)).map((projectRouter: AppRouterInterface) => (
                                <Card key={projectRouter.name+"_experience_page"} router={projectRouter} background={projectRouter.background}/>
                            ))}

                            {experienceData.projects.length == 0 ? (
                                <EmptyContent text={i18nplus("experience.projects", "experience.projects")} />
                            ) : null}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default ExperienceContent;