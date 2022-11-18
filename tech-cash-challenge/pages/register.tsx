import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import RegisterForm from "../components/registerForm"
import Link from "next/link"
import Header from "../components/header"


const Register = () => {

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
            <Paper elevation={20}>
                <RegisterForm></RegisterForm>
            </Paper>
            </Box>
        </div>
        </>
    )
}


export default Register
