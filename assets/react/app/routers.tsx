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

// This file defines the application routing configuration for different pages and categories.
// It sets up main routes, including home, about me, and contact pages.
// It dynamically fetches and adds routes for skills, projects, and experiences from repositories based on the selected language.
// The final route configuration is returned as an array of `AppRouterInterface` objects.

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
    id?: number
    type: RouterType,
    name: string,
    path: string,
    background?: string,
    role?: string,
    icon?: string,
    points?: number,
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
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.HOME}/>,
            underCagetories: [
                {
                    type: RouterType.ROUTER,
                    name: "global.about_me",
                    path: "/about-me",
                    background: aboutMeBackground,
                    active: false,
                    component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.ABOUT_ME}/>,
                    underCagetories: [
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.about_me_info",
                            path: "#about-me-info",
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.education_info",
                            path: "#education-info",
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.languages_info",
                            path: "#languages-info",
                            active: false,
                            component: () => <div></div>,
                            underCagetories: []
                        },
                        {
                            type: RouterType.ACHOR,
                            name: "sidebar.personal_skills_info",
                            path: "#personal-skills-info",
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
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        skills.forEach((skill: SkillEntity) => {

            skillsCategory.underCagetories.push({
                id: skill.id,
                type: RouterType.ROUTER,
                name: skill.name,
                path: `/skills/${skill.name}`.toLowerCase(),
                icon: skill.icon,
                points: skill.points,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.SKILL}/>,
                underCagetories: [
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.skill.information",
                        path: "#skill-information",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.skill.packages",
                        path: "#skill-packages",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.skill.projects",
                        path: "#skill-projects",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    }
                ]
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
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        projects.forEach((project: ProjectEntity) => {
            projectsCategory.underCagetories.push({
                id: project.id,
                type: RouterType.ROUTER,
                name: project.name,
                icon: project.icon,
                path: `/projects/${project.name.toLocaleLowerCase()}`,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.PROJECT}/>,
                underCagetories: [
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.project.information",
                        path: "#project-information",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.project.images",
                        path: "#project-images",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.project.packages",
                        path: "#project-packages",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    }
                ]
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
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.COLLECTION}/>,
            underCagetories: []
        }
        
        experiences.forEach((experience: ExperienceEntity) => {
            experiencesCategory.underCagetories.push({
                id: experience.id,
                type: RouterType.ROUTER,
                name: experience.name,
                role: experience.role,
                path: `/experiences/${experience.name}`,
                active: false,
                component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.EXPERIENCE}/>,
                underCagetories: [
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.experience.information",
                        path: "#experience-information",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.experience.skills",
                        path: "#experience-skills",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    },
                    {
                        type: RouterType.ACHOR,
                        name: "sidebar.experience.projects",
                        path: "#experience-projects",
                        active: false,
                        component: () => <div></div>,
                        underCagetories: []
                    }
                ]
            })
        })
        
        routers[0].underCagetories.push(experiencesCategory);

        routers[0].underCagetories.push({
            type: RouterType.ROUTER,
            name: "global.contact",
            path: "/contact",
            background: contactsBackground,
            active: false,
            component: (router: AppRouterInterface) => <FactoryContent router={router} pageType={PageType.CONTACT}/>,
            underCagetories: [
                {
                    type: RouterType.ACHOR,
                    name: "sidebar.contact.info",
                    path: "#contact-information",
                    active: false,
                    component: () => <div></div>,
                    underCagetories: []
                }
            ]
        });
    })

    return routers;
}