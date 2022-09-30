// Making object variables where i wil write css properties which will be imported in other components/divs.

export const fadeIn = {
    hidden: { opacity: 0},
    show: { opacity: 1, transition: {duration: 0.75}},
    exit: { opacity: 0, transition: {duration: 0.75}},
};

export const popup = {
    hidden: { opacity: 0, scale: 0},
    show: { opacity: 1, transition: {duration: 0.75}, scale: 1},
    exit: { opacity: 0, transition: {duration: 0.75}},
};