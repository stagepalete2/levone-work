import { useState, useEffect } from "react"
import { getPositions, registerUser } from '../api/apiMethods'

import 'animate.css';

const Login = ({ props }) => {
    const [positions, setPositions] = useState([])
    const [selectedUsername, setSelectedUsername] = useState('')
    const [selectedPosition, setSelectedPosition] = useState('')
    const [errors, setErrors] = useState([])
    const { user, setUser, telegramUserId, startTest, setStartTest } = props

    useEffect(() => {
        const fetchPositions = async () => {
            const response = await getPositions()
            setPositions(response)
        }
        fetchPositions()
    }, [])

    useEffect(() => {
        if (errors) {
            const timer = setTimeout(() => {
                setErrors('');
                setStartTest(false)
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [errors]);

    const handleRegistration = async () => {
        if (selectedUsername && selectedPosition) {
            try{
                const data = {
                    name: selectedUsername,
                    position: selectedPosition,
                    telegram_user_id: telegramUserId,
                };
                const response = await registerUser(data);
                if (response) {
                    setUser(response); // Save user info after successful registration
                } else {
                    setErrors("Ошибка при регистрации. Попробуйте снова.");
                }
            } catch (error) {
                setErrors("Произошла ошибка: " + (error.response?.data?.detail || error.error));
            }
        }else {
            setErrors("Вы не ввели имя или роль");
        }
    }

    const renderForm = (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '700px' }}>
            <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
            <div className="d-flex flex-column mt-3 p-5 text-center yellow-border rounded-25">
                <h3 className="text-white">Введите ваше ФИО и выберите роль</h3>
                <input
                    type="text"
                    className="input-field bg-222 mt-2 border-0"
                    placeholder="Фамилия Имя Отчество"
                    onChange={e => setSelectedUsername(e.target.value)}
                />
                <select
                    id="role"
                    className="select-field mt-3"
                    onChange={e => setSelectedPosition(e.target.value)}
                >
                    <option value="">Выберите роль</option>
                    {positions.map(position => (
                        <option key={position.id} value={position.id}>{position.name}</option>
                    ))}
                </select>
                {errors && (
                    <div className="error-text animate__animated animate__shakeX mt-3 text-danger">
                        {errors}
                    </div>
                )}
                <button type="submit" className="start-button mt-4" onClick={() => handleRegistration()}>Начать тест</button>
                <img src="/coin.png" className="img-fluid mx-auto" width={200} alt="Coin" />
            </div>
        </div>
    )

    const welcome = (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '700px' }}>
            <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
            <div className="d-flex flex-column mt-3 p-5 text-center yellow-border rounded-25">
                <h3 className="text-white">Вы авторизованы как {user?.name}</h3>
                <button type="submit" className="start-button mt-4" onClick={() => setStartTest(true)}>Начать тест</button>
                <img src="/coin.png" className="img-fluid mx-auto" width={200} alt="Coin" />
            </div>
        </div>
    )

    return (
        <div className="d-flex flex-row justify-content-center" style={{ width: '100%', minHeight: '100vh' }}>
            {user?.telegram_user_id ? welcome : renderForm }
        </div>
    )
}

export default Login
