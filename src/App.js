import Login from './components/Login'
import Question from './components/Question'
import { useState, useEffect } from "react"


import './styles.css'


function App() {

  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')

  const [next, setNext] = useState(true)

  useEffect(() => {
    console.log(username)
    console.log(role)
  }, [username, role])

  return (
    <>
      <div className='d-flex flex-row justify-content-center align-items-center bg-black'>
        {next === false
        ? <Login props={{username, setUsername, role, setRole}}/>
        : <Question />
        }
      </div>
    </>
  );
}

export default App;
