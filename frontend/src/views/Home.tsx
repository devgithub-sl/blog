import { ReactNode } from "react";
import { Box } from "@mui/material";

// Standalone Imports
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";


const Home  = () : ReactNode => {
    return(
        <>  
            <NavBar/>
            <Box sx={{
                padding: "10px",
                textAlign: "center",
                fontSize: "50px"
            }}>
                <h2>
                    Welcome to Blog<br/>
                    This is a basic Application that is made to represent a CRUD of our Article Model
                </h2>
            </Box>
            <Footer/>
        </>
    )
};

export default Home;