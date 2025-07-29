import Container from "./components/Container"
import Header from "./components/Header"
import UserContext from "./contexts/UserContext"


export default function App() {
  const user = {
    name: "KifelJhonssons",
    email: "kifel@email.com"
  }

  return (
    <>
      <UserContext.Provider value={user}>
        <hr />
        <Header />
        <h2>UseContext</h2>
        <Container />
      </UserContext.Provider>
    </>
  )
}