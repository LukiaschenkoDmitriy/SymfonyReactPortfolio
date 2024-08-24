import React from "react";

import LanguageEnum from "@enum/LanguageEnum";

import ProjectRepository from "@repository/ProjectRepository";
import ExperienceRepository from "@repository/ExperienceRepository";
import SkillRepository from "@repository/SkillRepository";

import SkillEntity from "@data/SkillEntity";
import ProjectEntity from "@data/ProjectEntity";
import ExperienceEntity from "@data/ExperienceEntity";

export enum RouterType {
    ROUTER = "router",
    ACHOR = "achor",

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
            name: "about_me",
            path: "/about-me",
            exact: false,
            active: false,
            component: () => <div>About me</div>,
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
            component: () => <div></div>,
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
    ];

    await new SkillRepository().findAll(language).then((skills) => { 
        const skillsCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "skills",
            path: "/skills",
            exact: false,
            active: false,
            component: () => <div>Skills</div>,
            underCagetories: []
        }
        
        skills.forEach((skill: SkillEntity) => {

            skillsCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: skill.name,
                path: `/skills/${skill.name}`,
                exact: false,
                active: false,
                component: () => <div>{skill.name}</div>,
                underCagetories: []
            })
        })
        
        routers.push(skillsCategory);
    })

    await new ProjectRepository().findAll(language).then((projects) => { 
        const projectsCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "projects",
            path: "/projects",
            exact: false,
            active: false,
            component: () => <div>Projects</div>,
            underCagetories: []
        }
        
        projects.forEach((project: ProjectEntity) => {
            projectsCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: project.name,
                path: `/projects/${project.name}`,
                exact: false,
                active: false,
                component: () => <div>{project.name}</div>,
                underCagetories: []
            })
        })
        
        routers.push(projectsCategory);
    })
    
    await new ExperienceRepository().findAll(language).then((experiences) => {
        const experiencesCategory: AppRouterInterface = {
            type: RouterType.ROUTER,
            name: "experiences",
            path: "/experiences",
            exact: false,
            active: false,
            component: () => <div>Experiences</div>,
            underCagetories: []
        }
        
        experiences.forEach((experience: ExperienceEntity) => {
            experiencesCategory.underCagetories.push({
                type: RouterType.ROUTER,
                name: experience.name,
                path: `/experiences/${experience.name}`,
                exact: false,
                active: false,
                component: () => <div>{experience.name}</div>,
                underCagetories: []
            })
        })
        
        routers.push(experiencesCategory);
    })

    return routers;
}