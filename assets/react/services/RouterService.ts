import { AppRouterInterface } from "@app/routers";

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

        // Return the updated array of application routers
        return appRouters;
    }
}