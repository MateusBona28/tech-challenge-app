import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createContext, useEffect, useState } from "react";
import AppContext from '../components/provider/AppContext';
import { useRouter } from 'next/router'
import { parseCookies } from "nookies"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter()

  const [user, setUser] = useState({})

  const [token, setToken] = useState("")

  const [transactions, setTransactions] = useState([])

  const [filteredTransactions, setFilteredTransactions] = useState([])

  const [isFiltered, setIsFiltered] = useState(false)
  
  const [filter, setFilter] = useState("DESC")

  const userContext = {
      user,
      setUser,
      token,
      setToken
  }

  const transactionsContext = {
    transactions,
    setTransactions,
    filteredTransactions,
    setFilteredTransactions
  }

  const filtersContext = {
    isFiltered,
    setIsFiltered,
    filter,
    setFilter
  }

  useEffect(() => {

    token === "" && router.push("/")

  },[token])

  return (
  <AppContext.Provider value={{
    userContext,
    transactionsContext,
    filtersContext
  }}>
    <Component {...pageProps} />
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
    />
  </AppContext.Provider>
  )
}
