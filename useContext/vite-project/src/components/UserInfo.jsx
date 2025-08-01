import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function UserInfo() {
    const user = useContext(UserContext)
    return (
        <div>
            <h2>Informacoes do Usuario:</h2>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )
}