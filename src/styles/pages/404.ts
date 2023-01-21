import { styled } from ".."

export const Container = styled("div", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    marginTop: "4rem",

    a: {
        fontSize: "$md",
        padding: ".4rem 1rem",
        border: "2px solid $green300",
        borderRadius: 8,
        textDecoration: "none",
        color: "$gray100",
        fontWeight: 400,
        width: "12rem",

        textAlign: "center",
        cursor: "pointer",

        "&:hover": {
            filter: "brightness(0.7)",
        },
    },
})
