

const Login = (props) => {
    const { username, setUsername, role, setRole } = props.props;

    return (
        <div className="d-flex flex-row justify-content-center" style={{width: '100%', minHeight: '100vh'}}>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '700px'}}>
                <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
                <div className="d-flex flex-column mt-3 p-5 text-center yellow-border rounded-25">
                    <h3 className="text-white">Введите ваше ФИО и выберите роль</h3>
                    <input type="text" name="" id="" className="input-field bg-222 mt-2 border-0" placeholder="Фамилия Имя Отчество" onChange={e=>setUsername(e.target.value)}/>
                    <select id="role" className="select-field mt-3" onChange={e=>setRole(e.target.value)}>
                        <option value="">Выберите роль</option>
                        <option value="waiter">Официант</option>
                        <option value="barista">Бариста</option>
                        <option value="manager">Менеджер</option>
                        <option value="hostess">Хостес</option>
                        <option value="barman">Бармен</option>
                        <option value="cleaner">Уборщица</option>
                    </select>
                    <button type="submit" className="start-button mt-4">Начать тест</button>
                    <img src="/coin.png" className="img-fluid mx-auto" width={200} alt="Coin" />
                </div>
            </div>
        </div>
    )
}

export default Login