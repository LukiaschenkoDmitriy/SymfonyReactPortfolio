import React from "react";

import LanguageEnum from "@enum/LanguageEnum";

import ProjectRepository from "@repository/ProjectRepository";
import ExperienceRepository from "@repository/ExperienceRepository";
import SkillRepository from "@repository/SkillRepository";

import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ExperienceEntity from "@data/ExperienceEntity";
import FactoryContent from "@components/content/FactoryContent";

import homeBackground from "@images/home/laptop-on-the-ground.jpg";
import aboutMeBackground from "@images/about-page/about-mebg.jpeg";
import skillsBackground from "@images/skills-page/skills-bg.png";
import projectsBackground from "@images/projects-page/projects-bg.png";
import experiencesBackground from "@images/experiences-page/experience-bg.png"
import contactsBackground from "@images/contacts-page/send-message-bg.png";

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
    background: string,
    icon?: string,
    exact?: boolean,
    active: boolean,
    component: React.FC<any>,
    underCagetories: AppRouterInterface[]
}

export async function getAppRouters(language: LanguageEnum = LanguageEnum.ENGLISH): Promise<AppRouterInterface[]> {
    let routers: AppRouterInterface[] = [
        {
            type: RouterType.ROUTER,
            name: "global.home",
            background: homeBackground,
            path: "/",
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.HOME}/>,
            underCagetories: [
                {
                    type: RouterType.ROUTER,
                    name: "global.about_me",
                    path: "/about-me",
                    background: aboutMeBackground,
                    exact: false,
                    active: false,
                    component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.ABOUT_ME}/>,
                    underCagetories: [
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.about_me_info",
                            path: "#about-me-info",
                            background: "",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.education_info",
                            path: "#education-info",
                            background: "",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.languages_info",
                            path: "#languages-info",
                            background: "",
                            exact: false,
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.personal_skills_info",
                            path: "#personal-skills-info",
                            background: "",
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
            name: "global.skills",
            path: "/skills",
            background: skillsBackground,
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
                background: skillsBackground,
                icon: skill.icon,
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
            name: "global.projects",
            path: "/projects",
            background: projectsBackground,
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
                background: projectsBackground,
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
            name: "global.experiences",
            path: "/experiences",
            background: experiencesBackground,
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
                background: experiencesBackground,
                exact: false,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.EXPERIENCE}/>,
                underCagetories: []
            })
        })
        
        routers[0].underCagetories.push(experiencesCategory);

        routers[0].underCagetories.push({
            type: RouterType.ROUTER,
            name: "global.contact",
            path: "/contact",
            background: contactsBackground,
            exact: false,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.CONTACT}/>,
            underCagetories: [
                {
                    type: RouterType.ACHOR,
                    name: "contact_info",
                    path: "#contact_info",
                    background: "",
                    exact: false,
                    active: false,
                    component: () => <div></div>,
                    underCagetories: []
                }
            ]
        });
    })

    return routers;
}