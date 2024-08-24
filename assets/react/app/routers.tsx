import React from "react";

import LanguageEnum from "@enum/LanguageEnum";

import ProjectRepository from "@repository/ProjectRepository";
import ExperienceRepository from "@repository/ExperienceRepository";
import SkillRepository from "@repository/SkillRepository";

import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ExperienceEntity from "@data/ExperienceEntity";
import FactoryContent from "@components/content/FactoryContent";

export enum RouterType {
    ROUTER = "router",
    ACHOR = "achor",

}

export enum PageType {
    PROJECT = "project",
    EXPERIENCE = "experience",
    SKILL = "skill",
    HOME = "home",
    ABOUT_ME = "about_me",
    CONTACT = "contact",
    COLLECTION = "collection"
}

export interface AppRouterInterface {
    type: RouterType,
    name: string,
    path: string,
    exact?: boolean,
    active: boolean,
    component: React.FC<any>,
    underCagetories: AppRouterInterface[]
}

export async function getAppRouters(language: LanguageEnum = LanguageEnum.ENGLISH): Promise<AppRouterInterface[]> {
    let routers: AppRouterInterface[] = [
        {
            type: RouterType.ROUTER,
            name: "home",
            path: "/",
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.HOME}/>,
            underCagetories: [
                {
                    type: RouterType.ROUTER,
                    name: "about_me",
                    path: "/about-me",
                    exact: false,
                    active: false,
                    component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.ABOUT_ME}/>,
                    underCagetories: [
                        {
                            type: RouterType.ACHOR,
                            name: "about_me_info",
                            path: "#about-me-info",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "education_info",
                            path: "#education-info",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "languages_info",
                            path: "#languages-info",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "personal_skills_info",
                            path: "#personal-skills-info",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        }
                    ]
                },
                {
                    type: RouterType.ROUTER,
                    name: "contact",
                    path: "/contact",
                    exact: false,
                    active: false,
                    component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.CONTACT}/>,
                    underCagetories: [
                        {
                            type: RouterType.ACHOR,
                            name: "contact_info",
                            path: "#contact_info",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        }
                    ]
                }
            ]
        },
    ];

    await new SkillRepository().findAll(language).then((skills) => { 
        const skillsCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "skills",
            path: "/skills",
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        skills.forEach((skill: SkillEntity) => {

            skillsCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: skill.name,
                path: `/skills/${skill.name}`,
                exact: false,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.SKILL}/>,
                underCagetories: []
            })
        })
        
        routers[0].underCagetories.push(skillsCategory);
    })

    await new ProjectRepository().findAll(language).then((projects) => { 
        const projectsCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "projects",
            path: "/projects",
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        projects.forEach((project: ProjectEntity) => {
            projectsCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: project.name,
                path: `/projects/${project.name}`,
                exact: false,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.PROJECT}/>,
                underCagetories: []
            })
        })
        
        routers[0].underCagetories.push(projectsCategory);
    })
    
    await new ExperienceRepository().findAll(language).then((experiences) => {
        const experiencesCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "experiences",
            path: "/experiences",
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        experiences.forEach((experience: ExperienceEntity) => {
            experiencesCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: experience.name,
                path: `/experiences/${experience.name}`,
                exact: false,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.EXPERIENCE}/>,
                underCagetories: []
            })
        })
        
        routers[0].underCagetories.push(experiencesCategory);
    })

    return routers;
}