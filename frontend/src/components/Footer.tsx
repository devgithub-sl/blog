import { Box } from "@mui/material";
import { ReactNode } from "react";

const Footer = () : ReactNode => {
    return(
        <>
            <Box component="footer" sx={{
                textAlign: "center",
                background: "rgb(25, 118, 210, 255)",
                color: "white",
                marginTop: "110px"
            }}>
                <h1>Made By Kisura W.S.P</h1>
            </Box>
        </>
    );
};

export default Footer;