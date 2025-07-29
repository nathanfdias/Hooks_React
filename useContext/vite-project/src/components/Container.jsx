import UserInfo from "./UserInfo"

export default function Container({ children }) {
    return (
        <div>
            <p>Container do APP</p>
            <UserInfo />
            {children}
        </div>
    )
}