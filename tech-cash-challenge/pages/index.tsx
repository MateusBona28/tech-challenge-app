import { Button, Paper, Box } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import Header from '../components/header'
import LoginForms from '../components/loginForms'
import AppContext from '../components/provider/AppContext'
import styles from '../styles/Home.module.css'

export default function Home() {

  const value: any = useContext(AppContext)

    const userContext = value.userContext

    const style = {
      color: "black",
      borderColor: "black",
      '&:hover': { 
          color: "white",
          borderColor: "black",
          bgcolor: "black"
      },
    }

  return (
    <div>
      <div>
        <Header color={"white"} logourl={"/logo.jpg"} width={120} height={50}></Header>
      </div>
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
    </div>
    
  )
}
