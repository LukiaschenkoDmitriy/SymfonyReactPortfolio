import React from "react";

export interface AppRouterInterface {
    name: string,
    path: string,
    exact?: boolean,
    active: boolean,
    component: React.FC<any>
}

export const AppRouters = [
    {
        name: "about_me",
        path: "/about-me",
        exact: true,
        active: true,
        component: () => <div>About me</div>
    }, 
    {
        name: "skills",
        path: "/skills",
        exact: false,
        active: false,
        component: () => <div>Skills</div>
    },
    {
        name: "experiences",
        path: "/experiences",
        exact: false,
        active: false,
        component: () => <div>Experiences</div>
    },
    {
        name: "projects",
        path: "/projects",
        exact: false,
        active: false,
        component: () => <div>Projects</div>
    },
    {
        name: "contact",
        path: "/contact",
        exact: false,
        active: false,
        component: () => <div>Contact</div>
    }
];