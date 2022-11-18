import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import AppContext from "../provider/AppContext"
import { useRouter } from 'next/router'
import { Button } from '@mui/material';


const Header = ({ color, logourl, width, height }:any) => {

    const value: any = useContext(AppContext)

    const userContext = value.userContext

    const router = useRouter()

    const handleLogout = () => {

        userContext.setToken("")
        localStorage.removeItem("token")
        userContext.setUser({})

    }

    const style = {
        color: "black",
        borderColor: "black",
        '&:hover': { 
            color: "white",
            borderColor: "black",
            bgcolor: "black"
        },
    }

    return(
        <div className="home-header" style={{background: color}}>
            <div className="logo-div" style={{width: `${width}px`, height:`${height}px`}}>
                <Image src={logourl} alt="ng-cash-logo" width={width} height={height}>
                </Image>
            </div>
            {userContext.token === "" ? 
            <div className="home-header__button-handler">
                <Link href={"/login"}>
                    <Button variant="outlined" sx={style}>
                        Login        
                    </Button>
                </Link>
                <Link href={"/register"}>
                    <Button variant="outlined" sx={style}>
                        Criar Conta        
                    </Button>
                </Link>
            </div> : 
            <div>
                <Button variant="outlined" sx={{
                    color: "white",
                    borderColor: "white",
                    '&:hover': { 
                        color: "black",
                        borderColor: "black",
                        bgcolor: "white"
                    },
                }} onClick={() => {handleLogout()}}>
                    Sair      
                </Button>
            </div>}
        </div>
    )
}

export default Header
