import { AppRouterInterface } from "@app/routers";
import ProjectEntity from "@data/ProjectEntity";
import SkillEntity from "@data/SkillEntity";

import $ from "jquery";

export class RouterService {
    /**
     * Updates the 'active' property of the provided appRouters based on the given routerPath.
     *
     * @param appRouters - An array of application routers.
     * @param routerPath - The path of the router to be marked as active.
     * @returns The updated array of application routers.
     */
    public static actualiseRoutersActive(appRouters: AppRouterInterface[], routerPath: string): AppRouterInterface[] {
        // Iterate through each router in the appRouters array
        appRouters.forEach((router, index) => {
            // If the router's path matches the given routerPath, set its 'active' property to true
            if (router.path === routerPath) {
                appRouters[index].active = true;
            } else {
                // Otherwise, set its 'active' property to false
                appRouters[index].active = false;
            }

            // Iterate through each subrouter in the router's underCagetories array
            router.underCagetories.forEach((subrouter, index2) => {
                // If the subrouter's path matches the given routerPath, set its 'active' property to true
                if (subrouter.path === routerPath) {
                    appRouters[index].underCagetories[index2].active = true;
                } else {
                    // Otherwise, set its 'active' property to false
                    appRouters[index].underCagetories[index2].active = false;
                }
            });
        });

        this.toTopScroll()

        // Return the updated array of application routers
        return appRouters;
    }

    public static toTopScroll() {
        $(".sr-scroll-top-button").trigger("click");
    }

    public static getSkillRoutesByIds(appRouters: AppRouterInterface[], ids: string[]): AppRouterInterface[]
    {
        const currentSkillRouter:AppRouterInterface[] = [];

        const skillsRouters = appRouters[0].underCagetories[1].underCagetories;

        skillsRouters.forEach(router => {
            if (router.id != undefined) {
                if (ids.includes(router.id.toString())) {
                    currentSkillRouter.push(router);
                }
            }
        });

        return currentSkillRouter;
    }

    public static getProjectRoutesByEntities(appRouters: AppRouterInterface[], projectEntities: ProjectEntity[]): AppRouterInterface[]
    {
        const currentProjectRouter:AppRouterInterface[] = [];

        const projectsRouters = appRouters[0].underCagetories[2].underCagetories;

        projectsRouters.forEach(router => {
            if (router.id != undefined) {
                projectEntities.forEach((projectEntity: ProjectEntity) => {
                    if (router.id == projectEntity.id) currentProjectRouter.push(router);
                })
            }
        });

        return currentProjectRouter;
    }

    public static getSkillsRoutesByEntities(appRouters: AppRouterInterface[], skillEntities: SkillEntity[]): AppRouterInterface[]
    {
        const currentProjectRouter:AppRouterInterface[] = [];

        const projectsRouters = appRouters[0].underCagetories[1].underCagetories;

        projectsRouters.forEach(router => {
            if (router.id != undefined) {
                skillEntities.forEach((skillEntity: SkillEntity) => {
                    if (router.id == skillEntity.id) currentProjectRouter.push(router);
                })
            }
        });

        return currentProjectRouter;
    }

    public static getActualRouter(appRouters: AppRouterInterface[], routerPath: string): AppRouterInterface | undefined {
        let currentRouter;

        appRouters.forEach((router, index) => {
            // If the router's path matches the given routerPath, set its 'active' property to true
            if (router.path === routerPath) {
                currentRouter = router;
                return;
            }

            // Iterate through each subrouter in the router's underCagetories array
            router.underCagetories.forEach((subrouter, index2) => {
                // If the subrouter's path matches the given routerPath, set its 'active' property to true
                if (subrouter.path === routerPath) {
                    currentRouter = subrouter;
                    return;
                }

                subrouter.underCagetories.forEach((subrouter2, index3) => {
                    // If the subrouter's path matches the given routerPath, set its 'active' property to true
                    if (subrouter2.path === routerPath) {
                        currentRouter = subrouter2;
                        return;
                    }
                });
            });
        });

        return currentRouter;
    }

    public static getBreadcrumbs(appRouters: AppRouterInterface[], routerPath: string): AppRouterInterface[] {
        for (let index = 0; index < appRouters[0].underCagetories.length; index++) {
            if (appRouters[0].underCagetories[index].path ==  routerPath) return [appRouters[0], appRouters[0].underCagetories[index]];

            let subcategory =appRouters[0].underCagetories[index];
            
            for (let index2 = 0; index2 < subcategory.underCagetories.length; index2++) {
                if (subcategory.underCagetories[index2].path ==  routerPath) return [
                    appRouters[0], 
                    subcategory,
                    subcategory.underCagetories[index2]
                ];
            }
        }

        return [appRouters[0]];
    }
}