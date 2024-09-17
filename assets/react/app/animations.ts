import { Variants } from "framer-motion";

// This file defines various animation configurations for use with framer-motion.
// It exports different animation variants for components such as:
// - About items
// - Contact group errors
// - Contact group animations
// - Card items
// - Sidebar items
// - Content
// - Loading
// - Header
// - Sidebar
//
// Each variant specifies animations for different states, including 'in', 'out', and 'hover',
// and provides options for customizing transitions based on the component's props.


export interface ContactGroupAnimationCustom {
    index: number,
    xOffset: number,
    yOffset: number,
}

export const AboutItemAnimation: Variants = {
    inView: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
        }
    },
    out: {
        opacity: 0,
        scale: 0.9,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
        }
    },
    hover: {
        opacity: 1,
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
        }
    }
}

export const ContactGroupErrorAnumation: Variants = {
    in: (i) => ({
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
            delay: 1
        }
    }),
    out: (i) => ({
        opacity: 0,
        scale: 0.8,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
        }
    })
}

export const ContactGroupAnimation: Variants = {
    in: (custom: ContactGroupAnimationCustom) => ({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
            delay: custom.index * 0.25
        }
    }),
    out: (custom: ContactGroupAnimationCustom) => ({
        opacity: 0,
        y: custom.yOffset,
        x: custom.xOffset,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 11.5,
            mass: 1,
            delay: custom.index * 0.25
        }
    })
}

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