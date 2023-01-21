import { styled } from "../../styles/index"

export const ArrowButton = styled("button", {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "8.5rem",
    height: "100%",
    background: "linear-gradient(270deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
    cursor: "pointer",
    border: "none",
    outline: "none",
    color: "$white",
    fill: "$white",
    padding: "0 1rem",

    variants: {
        direction: {
            left: {
                left: 0,
                textAlign: "left",
            },
            right: {
                right: 0,
                textAlign: "right",
                background: "linear-gradient(90deg, rgba(18, 18, 20, 0) 0%, rgba(18, 18, 20, 0.75) 100%)",
            },
        },
        disabled: {
            true: {
                opacity: 0.2,
            },
        },
    },
})
