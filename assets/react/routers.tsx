import APIService from "@services/APIService";
import React from "react";

export interface AppRouterInterface {
    name: string,
    path: string,
    exact?: boolean,
    active: boolean,
    component: React.FC<any>,
    underCagetories: AppRouterInterface[]
}


export async function getAppRouters(): Promise<AppRouterInterface[]> {
    let routers: AppRouterInterface[] = [
        {
            name: "about_me",
            path: "/about-me",
            exact: false,
            active: false,
            component: () => <div>About me</div>,
            underCagetories: []
        },
        {
            name: "contact",
            path: "/contact",
            exact: false,
            active: false,
            component: () => <div>Contact</div>,
            underCagetories: []
        }
    ];

    const apiservice = new APIService();

    await apiservice.getSkills(null).then((skills) => { 
        const skillsCategory: AppRouterInterface = {
            name: "skills",
            path: "/skills",
            exact: false,
            active: false,
            component: () => <div>Skills</div>,
            underCagetories: []
        }
        
        skills.forEach((skill: any) => {
            skillsCategory.underCagetories.push({
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

    await apiservice.getProjects(null).then((projects) => { 
        const projectsCategory: AppRouterInterface = {
            name: "projects",
            path: "/projects",
            exact: false,
            active: false,
            component: () => <div>Projects</div>,
            underCagetories: []
        }
        
        projects.forEach((project: any) => {
            projectsCategory.underCagetories.push({
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
    
    await apiservice.getExperiences(null).then((experiences) => {
        const experiencesCategory: AppRouterInterface = {
            name: "experiences",
            path: "/experiences",
            exact: false,
            active: false,
            component: () => <div>Experiences</div>,
            underCagetories: []
        }
        
        experiences.forEach((experience: any) => {
            experiencesCategory.underCagetories.push({
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

    return await routers;
}