import LoginForms from "../components/loginForms"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Link from "next/link"
import { Button } from "@mui/material"
import Header from "../components/header"


const LoginForm = () => {

    const style = {
        color: "black",
        borderColor: "black",
        '&:hover': { 
            color: "black",
            borderColor: "black",
        },
        '&:active': {
            color: "black"
        }
    }

    return(
        <>
        <Header color={"white"} logourl={"/logo.jpg"} width={120} height={50}></Header>
        <div className="centerDiv">
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 300,
                height: 300,
                },
            }}
            >
            <Paper elevation={8} sx={{mx: "auto"}}>
                <LoginForms></LoginForms>
            </Paper>
            </Box>
        </div>
        </>
    )
}


export default LoginForm
