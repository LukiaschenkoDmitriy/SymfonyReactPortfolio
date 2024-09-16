import { Variants } from "framer-motion";

export const CardItemAnimation: Variants = {
    in: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1,
            delay: i * 0.05
        }
    }),
    out: (i) => ({
        opacity: 0,
        y: -500,
        transition: {
            duration: 0.5,
            delay: i * 0.05,
        }
    }),
    hover: {
        scale: 0.9,
        transition: {
            duration: 0.25,
        }
    }
}

export const SideBarItemAnimation: Variants = {
    in: (i) => ({
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.05 ,
        }
    }),
    out: (i) => ({
        opacity: 0,
        x: -500,
        transition: {
            duration: 0.5,
            delay: i * 0.05,
        }
    })
}

export const ContentAnimation: Variants = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        }
    },
    out: {
        opacity: 0,
        y: 500,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        y: -500,
        transition: {
            duration: 0.5,
        }
    }
}

export const LoadingAnimation: Variants = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5,
            duration: 0.5,
        }
    },
    out: {
        opacity: 0,
        y: 50,
        transition: {
            delay: 0.5,
            duration: 0.5,
        }
    }
}

export const HeaderAnimation: Variants = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        }
    },
    out: {
        opacity: 0,
        y: -200,
        transition: {
            duration: 1,
        }
    },
    exit: {
        opacity: 0,
        y: -200,
        transition: {
            duration: 0.5,
        }
    }
}

export const SideBarAnimation: Variants = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        }
    },
    out: {
        opacity: 0,
        y: 500,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        x: -500,
        transition: {
            duration: 0.5,
        }
    }
}