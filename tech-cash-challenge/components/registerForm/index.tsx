import { TextField, Button } from '@mui/material';
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { instance } from '../../pages/api/axios';
import { toast } from "react-toastify"
import { useRouter } from 'next/router';


export const RegisterForm = () => {

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

    const router = useRouter()

    const FormSubmit = (data: any) => {

        instance.post("/users", data)
        .then((res) => {
            toast.success("Cadastro Efetuado Com Sucesso!")
            router.push("/login")
        })
        .catch((err) => {toast.error("Falha no cadastro, tente novamente.")})
    }

    return(
        <div>
            <form onSubmit={handleSubmit(FormSubmit)} className="register-loginForms">
                <TextField id="username" label="Nome de usuário" variant="outlined" {...register("username")} color="secondary"/>
                <TextField id="password" label="Senha" variant="outlined" type="password" {...register("password")} color="secondary"/>
                <div style={{display: "flex", flexDirection: "row", gap: "25px"}}>
                    <Button sx={style} variant="outlined" type="submit">Cadastrar</Button>
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


export default RegisterForm
