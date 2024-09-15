import { Variants } from "framer-motion";

export const ContentAnimation: Variants = {
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay:1
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
            delay: 0.5,
            duration: 0.5,
        }
    },
    out: {
        opacity: 0,
        y: -200,
        transition: {
            delay: 0.5,
            duration: 0.5,
        }
    }
}

export const SideBarAnimation: Variants = {
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
        y: 500,
        transition: {
            delay: 0.5,
            duration: 0.5,
        }
    }
}