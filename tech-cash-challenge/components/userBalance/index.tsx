import { useContext, useEffect, useState } from "react"
import AppContext from "../provider/AppContext"
import { Button, TextField, Typography } from '@mui/material';
import { instance } from "../../pages/api/axios";
import Modal from '@mui/material/Modal';
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import CardsFilter from "../cardsFilter";


const UserBalance = () => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);

    const value: any = useContext(AppContext)

    const { userContext, transactionsContext, filtersContext } = value

    const { user, token, setUser, setToken } = userContext

    const { transactions, setTransactions, filteredTransactions } = transactionsContext

    const { isFiltered, filter } = filtersContext

    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false)
        const cookies = parseCookies(null)

        setToken(cookies.TOKEN)
    };

    const [haveTransactions, setHaveTransactions] = useState(false)

    useEffect(() => {

        if (token !== ""){
            instance.get(`/users/${user.id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {console.log(err)})
        }
    }, [])

    useEffect(() => {

        if (user?.account?.debitedTransactions?.length > 0 || user?.account?.creditedTransactions?.length > 0){
            setHaveTransactions(true)

            const allTransactions: any = []

            user.account.creditedTransactions?.map((creditedTransaction: any) => {
                allTransactions.push({...creditedTransaction, type: "Entrada"})
            })

            user.account.debitedTransactions?.map((debitedTransaction: any) => {
                allTransactions.push({...debitedTransaction, type: "Saída"})
            })

            const sorted = allTransactions.sort((a:any, b:any) => {
                const dateA: any = new Date(a.createdAt)
                const dateB: any = new Date(b.createdAt)
                return dateB - dateA
            })

            setTransactions(sorted)
        }

    }, [user])
    

    const FormSubmit = async (data: any) => {

        data.value = parseFloat(data.value)

        const loader = toast.loading("Processando...")
        
        instance.post("/transactions", data, {
            headers:{
                "Authorization": `Bearer ${token}`
            }
        })
        .then((res) => {

            toast.dismiss(loader)

            toast.success("Transferência realizada!")

            userContext.setToken(res.data.token)

            instance.get(`/users/${user.id}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
            })

            handleClose()
        })
        .catch((err) => {
            toast.dismiss(loader)
            toast.error("Falha na transferência, verifique se o nome de usuário está correto ou seu saldo.")
        })
        
    }

    return (
        <div className="user-content">
            <div className="user-content__info">
                <div>
                    <h2>Olá {user?.username}</h2>
                </div>
                <div className="user-content__info-balance">
                    <span>Saldo:</span>
                    <span style={{color: "#009688", fontWeight: 700}}>R${user?.account?.balance}</span>
                </div>
                <div>
                    <Button variant="outlined" onClick={handleOpen}
                    sx={{
                        color: "black",
                        borderColor: "black",
                        '&:hover': { 
                            color: "white",
                            borderColor: "black",
                            bgcolor: "black"
                        },
                    }}
                    >Nova Transferência</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={handleSubmit(FormSubmit)} className="register-loginForms">
                                <h3>Nova transferência</h3>
                                <TextField id="username" label="Para:" variant="outlined" color="secondary" {...register("username")} />
                                <TextField id="password" label="Valor:" variant="outlined"  color="secondary" {...register("value")} />
                                <Button variant="outlined" type="submit" sx={{
                                    color: "black",
                                    borderColor: "black",
                                    '&:hover': { 
                                        color: "white",
                                        borderColor: "black",
                                        bgcolor: "black"
                                    },}}>Transferir</Button>
                            </form>
                        </Box>
                    </Modal>
                </div>
            </div>
            <div className="transactionCardsList">
                <div className="transactions-cards__header">
                    <div>
                        <h3>Minhas transferências:</h3>
                        <CardsFilter />
                    </div>
                    <div>
                    </div>
                </div>
                {
                    isFiltered ? filteredTransactions?.map((transaction: any) => 
                    <div key={transaction.id} className="transactionCards">
                    {filter === "cash-in" && <div className="card-filled__entry"></div>}
                    {filter === "cash-out" && <div className="card-filled__exit"></div>}
                    <div className="div-valor">
                        {filter === "cash-in" && <span style={{color: "black"}}>Transferência recebida</span>}
                        {filter === "cash-out" && <span style={{color: "black"}}>Transfêrencia enviada</span>}
                        <div>
                            <span>R$</span>
                            <span>{transaction.value}</span>
                        </div>
                            <span>{transaction.createdAt.split("-").reverse().join("/")}</span>
                        </div>
                        <div className="card-filled__inv">
                        </div>
                    </div>)
                    : haveTransactions === true ? (
                        transactions?.map((transaction: any) => 
                        <div key={transaction.id} className="transactionCards">
                            {transaction.type === "Entrada" ? <div className="card-filled__entry"></div> : <div className="card-filled__exit"></div>}
                            <div className="div-valor">
                                {transaction.type === "Entrada" ? <span style={{color: "black"}}>Transferência recebida</span> : <span style={{color: "black"}}>Transfêrencia enviada</span>}
                                <div>
                                    <span>R$</span>
                                    <span>{transaction.value}</span>
                                </div>
                                <span>{transaction.createdAt.split("-").reverse().join("/")}</span>
                            </div>
                            <div className="card-filled__inv">
                            </div>
                        </div>
                    )) : <h3>Sem tranferências registradas</h3>
                }
            </div>
        </div>
    )
}   

export default UserBalance
