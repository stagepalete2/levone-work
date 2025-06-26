
const TestFinish = ({results, back}) => {
    return (
        <div className='d-flex flex-row justify-content-center align-items-center bg-black'>
            <div className="d-flex flex-row justify-content-center" style={{ width: '100%', minHeight: '100vh', padding: '1rem' }}>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ width: '700px' }}>
                    <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
                    <div className="card" id="test-card">
                        <h2>Вы уже прошли этот тест</h2>
                        <div className="special-text">{results?.result} из {results?.max_questions}</div>
                        <button className="ans-button" onClick={() => back()}>Назад</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestFinish