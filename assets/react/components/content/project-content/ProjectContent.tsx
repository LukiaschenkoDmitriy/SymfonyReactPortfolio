import "./ProjectContent.scss";

import React, { CSSProperties, useContext, useEffect, useState } from "react";

import { ContentProps } from "../FactoryContent";

import ProjectEntity from "@data/ProjectEntity";

import ProjectRepository from "@repository/ProjectRepository";
import { AppContext } from "@app/app";
import ReactLoading from "react-loading";
import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import i18nplus from "@services/TranslateService";
import { RouterService } from "@services/RouterService";
import Card from "../collection-content/card/Card";
import { AppRouterInterface } from "@app/routers";

import projectBackground from "@images/projects-page/projects-bg.png";
import GithubButton from "@components/github-button/GithubButton";
import EmptyContent from "@components/empty-content/EmptyContent";
import Gallery from "@components/gallery/Gallery";

// This file defines the ProjectContent component, which displays detailed information about a specific project.
// It sets the document title based on the router's name and applies a background image to the page.
// The component fetches project data using the ProjectRepository and displays a loading spinner while the data is being fetched.
// Once the data is available, it renders project details, including a GitHub link (if available), images, and related skills using cards.
// A gallery component is used to display project images, and empty content is shown if no images are available.
// The Breadcrumb component is used for navigation, and the content is styled with specific CSS for the project page.

const ProjectContent: React.FC<ContentProps> = ({router}) => {

    document.title = i18nplus(router.name, router.name);

    const appContext = useContext(AppContext);
    const [projectData, setProjectData] = useState<ProjectEntity>();

    const pageStyles: CSSProperties = {
        background: `url('${projectBackground}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    }

    useEffect(() => {
        (async() => {
            (router.id) ? setProjectData(await new ProjectRepository().findById(router.id, appContext.currentLanguage)) : null;
        })();
    }, [appContext.appRouters, appContext.currentLanguage]);

    return (
        <div className="sr-content-inner sr-content-inner-project" style={pageStyles}>
            {(projectData == undefined) ? (
                <div className="vw-100 vh-100 d-flex flex-wrap justify-content-center align-content-center content-loader">
                    <ReactLoading type="bars" color="#122932" height={"100px"} width={"100px"}/>
                </div>
            ) : (
                <div className="container my-5">
                <Breadcrumb router={router}/>
                    <section className="sr-content-page" id="project-information">
                        <h1 className="title">{i18nplus(projectData.name, projectData.name)}</h1>
                        <div className="sr-about-container">
                            <div className="sr-about-row row">
                                <div className="description col-12 col-lg-6">
                                    <strong>{projectData.description}</strong>
                                </div>
                                <div className="image col-12 col-lg-6">
                                    <img src={projectData.icon} alt="Icon" />
                                </div>
                            </div>
                        </div>

                        <GithubButton>
                            {projectData.github.length != 0 ? (
                                <a href={projectData.github} className="project-content-github-link" target="_blank">
                                    {projectData.name + " GitHub / GitLab"}
                                </a>
                            ): (
                                <div className="project-content-github-nda">{i18nplus("project.nda", "project.nda")}</div>
                            )}
                        </GithubButton>
                    </section>
                    <section className="sr-content-page-add" id="project-images">
                        <h1 className="title">{i18nplus("project.images", "project.images")}</h1>
                        <div className="sr-about-container row">
                            {projectData.images.length == 0 ? (
                                <EmptyContent text={i18nplus("project.image_empty", "project.image_empty")} />
                            ): (
                                <Gallery images={projectData.images} />
                            )}
                        </div>
                    </section>
                    <section className="sr-content-page-add" id="project-packages">
                        <h1 className="title">{i18nplus("project.skills", "project.skills")}</h1>
                        <div className="sr-about-container row">
                            {(RouterService.getSkillsRoutesByEntities(appContext.appRouters, projectData.skills)).map((skillRouter: AppRouterInterface) => (
                                <Card key={skillRouter.name+"_project_page"} router={skillRouter} background={skillRouter.background}/>
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default ProjectContent;