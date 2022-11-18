import { TextField, Button } from '@mui/material';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { instance } from '../../pages/api/axios';
import AppContext from '../provider/AppContext';
import jwt from "jsonwebtoken"
import { useRouter } from 'next/router'
import { setCookie } from 'nookies';
import { toast } from "react-toastify"


export const LoginForms = () => {

    const style = {
        color: "white",
        borderColor: "black",
        bgcolor: "black",
        '&:hover': { 
            color: "black",
            borderColor: "black"
        }
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    const value: any = useContext(AppContext)

    const userContext = value.userContext

    const router = useRouter()

    const token = userContext.token

    const FormSubmit = async (data: any) => {

        const loader = toast.loading("Processando...")
        
        await instance.post("/login", data)
        .then((res) => {
            toast.dismiss(loader)
            userContext.setToken(res.data.token)
            setCookie(null, "TOKEN", res.data.token, {
                maxAge: 86400,
                path: "/"
            })
            router.push("/dashboard")
        })
        .catch((err) => {
            toast.dismiss(loader)
            toast.error("Usuário ou senha incorretos.")
        })
        
    }

    useEffect(() => {

        jwt.verify(token, process.env.SECRET_KEY as string, (error:any, decoded:any ) => {

            userContext.setUser(decoded?.user)
        
        })
    },[token])

    return(
        <div>
            <form onSubmit={handleSubmit(FormSubmit)} className="register-loginForms">
                <TextField id="username" label="Nome de usuário" variant="outlined" {...register("username")} color="secondary" />
                <TextField id="password" label="Senha" type="password" variant="outlined" {...register("password")} color="secondary" />
                <div style={{display: "flex", flexDirection: "row", gap: "15px"}}>
                    <Button sx={style} variant="outlined" type="submit">Login</Button>
                    <Link href={"/"}>
                        <Button sx={{
                            color: "black",
                            borderColor: "black",
                            bgcolor: "white",
                            '&:hover': { 
                                color: "black",
                                borderColor: "black"
                            },
                        }} variant="outlined">Voltar</Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}


export default LoginForms
