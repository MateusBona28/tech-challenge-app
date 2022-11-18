import { useContext } from "react"
import Header from "../components/header"
import AppContext from "../components/provider/AppContext"
import UserBalance from "../components/userBalance"


const Dashboard = () => {

    const value: any = useContext(AppContext)

    const userContext = value.userContext

    return (
        <div>
            <Header color={"black"} logourl={"/ngcast-branco.png"} width={100} height={80}></Header>
            <div className="user-content">
                <UserBalance></UserBalance>
            </div>
        </div>
    )
}


export default Dashboard
