import Login from './components/Login'
import Question from './components/Question'
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react"
import TestFinish from './components/TestFinish';

import { getUser, registerUser, getTest, checkResult, getPositions } from './api/apiMethods'

import './styles.css'
import 'animate.css';


function App() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const telegramUserId = queryParams.get('telegram_user_id');


  const [user, setUser] = useState(null)
  const [startTest, setStartTest] = useState(false)
  const [test, setTest] = useState(null)
  const [errors, setErrors] = useState([])
  const [results, setResults] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try{
        const response = await getUser({telegram_user_id: telegramUserId})
        if (response){
          setUser(response)
        }
      } catch(error){
        console.log(error)
      }
    }
    fetchUser()
  }, [])

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await getTest({ telegram_user_id: telegramUserId });

        // Check if it's a result object
        if (response?.result !== undefined) {
          setResults(response);
        }
        // Check if it's a test object (contains questions)
        else if (response?.questions) {
          setTest(response);
        } else {
          setErrors(response.response?.data?.error || "Unknown error");
        }
      } catch (error) {
        setErrors(error.response?.data?.error || "Failed to load test.");
      }
    };

    if (startTest) {
      fetchTest();
    }
  }, [startTest]);

  const handleBack = () => {
    setStartTest(false);
    setTest(null);
    setErrors([]);
    setResults(null);
  };

  useEffect(() => {
    console.log(results)
  }, [results])


  const main = (
    <div className='d-flex flex-row justify-content-center align-items-center bg-black'>
        {!startTest
        ? <Login props={{user, setUser, telegramUserId, startTest, setStartTest}}/>
        : <Question props={{errors, setErrors, setStartTest, test, telegramUserId, results, setResults}} />
        }
    </div>
  )


  return (
    <>
      {results ? <TestFinish results={results} back={handleBack}/> : main}
    </>
  );
}

export default App;
