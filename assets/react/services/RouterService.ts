import { AppRouterInterface } from "@app/routers";

export class RouterService {
    public static actualiseRoutersActive(appRouters: AppRouterInterface[], routerPath: string): AppRouterInterface[] {
        appRouters.forEach((router, index) => {
            if (router.path === routerPath) {
                appRouters[index].active = true;
            } else {
                appRouters[index].active = false;
            }

            router.underCagetories.forEach((subrouter, index2) => {
                if (subrouter.path === routerPath) {
                appRouters[index].underCagetories[index2].active = true;
            } else {
                appRouters[index].underCagetories[index2].active = false;
            }
            });
        });

        return appRouters;
    }
}