import { styled } from ".."

export const NavigationWrapperKeenSlider = styled("div", {
    position: "relative",
    display: "flex",
    // gap: "3rem",
    width: "100%",
    maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
    marginLeft: "auto",
    // minHeight: 480,
    marginTop: "4rem",
    alignItems: "center",
    justifyContent: "center",
})

export const HomeContainer = styled("main", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // // gap: "3rem",
    // width: "100%",
    // maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
    // marginLeft: "auto",
    // minHeight: 480,
    // position: "relative",
    "&:last-child": {
        marginRight: "16rem",
    },
})

export const Product = styled("div", {
    background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100% )",
    borderRadius: 8,
    // padding: "0.25rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    // width: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    img: {
        objectFit: "cover",
    },
    footer: {
        position: "absolute",
        bottom: "0.25rem",
        left: "0.25rem",
        right: "0.25rem",
        borderRadius: 6,
        padding: "1.5rem",

        transform: "translateY(110%)",
        transition: "all 0.2s ease-in-out",
        opacity: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(0,0,0, 0.6)",

        strong: {
            fontSize: "$sm",
            color: "$gray100",
            // letterSpacing: "1px",
            fontWeight: 400,
        },
        span: {
            fontSize: "$md",
            fontWeight: "bold",
            color: "$green300",
        },
    },

    "&:hover": {
        footer: {
            transform: "translateY(0%)",
            opacity: 1,
        },
    },
})
