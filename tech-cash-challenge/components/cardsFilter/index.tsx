import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useContext, useState } from "react"
import AppContext from "../provider/AppContext"
import * as React from 'react';
import { instance } from "../../pages/api/axios";


const CardsFilter = () => {

    const value: any = useContext(AppContext)

    const { transactionsContext, filtersContext, userContext } = value
    
    const { transactions, setTransactions, filteredTransactions, setFilteredTransactions } = transactionsContext

    const { isFiltered, setIsFiltered, filter, setFilter } = filtersContext

    const { user, token } = userContext

    const handleChange = (event: SelectChangeEvent) => {

        if (event.target.value === "DESC") {
            setIsFiltered(false)
            setFilter(event.target.value)

            const transactions :any = []

            user.account.creditedTransactions?.map((creditedTransaction: any) => {
                transactions.push({...creditedTransaction, type: "Entrada"})
            })

            user.account.debitedTransactions?.map((debitedTransaction: any) => {
                transactions.push({...debitedTransaction, type: "Saída"})
            })

            const sorted = transactions.sort((a:any, b:any) => {
                const dateA: any = new Date(a.createdAt)
                const dateB: any = new Date(b.createdAt)
                return dateB - dateA
            })

            setTransactions(sorted)
        }
        else if(event.target.value === "ASC") {

            setIsFiltered(false)
            setFilter(event.target.value)

            const transactions :any = []

            user.account.creditedTransactions?.map((creditedTransaction: any) => {
                transactions.push({...creditedTransaction, type: "Entrada"})
            })

            user.account.debitedTransactions?.map((debitedTransaction: any) => {
                transactions.push({...debitedTransaction, type: "Saída"})
            })

            const sorted = transactions.sort((a:any, b:any) => {
                const dateA: any = new Date(a.createdAt)
                const dateB: any = new Date(b.createdAt)
                return dateA - dateB
            })

            setTransactions(sorted)
            
        }
        else if(event.target.value === "cash-in") {
            setIsFiltered(true)
            setFilter(event.target.value)
            setFilteredTransactions([])

            instance.get(`/users/${user.id}/cash-in`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {

                const sorted = res.data.account.creditedTransactions.sort((a:any, b:any) => {
                    const dateA: any = new Date(a.createdAt)
                    const dateB: any = new Date(b.createdAt)
                    return dateB - dateA
                })

                setFilteredTransactions(sorted)
            })
        }
        else {
            setIsFiltered(true)
            setFilter(event.target.value)
            setFilteredTransactions([])

            instance.get(`/users/${user.id}/cash-out`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res) => {

                const sorted = res.data.account.debitedTransactions.sort((a:any, b:any) => {
                    const dateA: any = new Date(a.createdAt)
                    const dateB: any = new Date(b.createdAt)
                    return dateB - dateA
                })

                setFilteredTransactions(sorted)
            })
        }

    }


    return (
        <>
            <FormControl fullWidth variant="standard" color="secondary">
                <InputLabel id="demo-simple-select-label">Filtrar por:</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filtrar por..."
                onChange={handleChange}
                >
                <MenuItem value={"DESC"}>Recentes</MenuItem>
                <MenuItem value={"ASC"}>Antigos</MenuItem>
                <MenuItem value={"cash-in"}>Transferências recebidas</MenuItem>
                <MenuItem value={"cash-out"}>Transferências enviadas</MenuItem>
                </Select>
            </FormControl>
        </>
    )

}


export default CardsFilter
