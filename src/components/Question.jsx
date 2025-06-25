

const Question = () => {
    return (
         <div className="d-flex flex-row justify-content-center" style={{width: '100%', minHeight: '100vh'}}>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{width: '700px'}}>
                <img src="/logo.png" className="img-fluid w-50" alt="Logotype" />
                <div className="card" id="test-card" >
                    <h2 id="test-title">Тест</h2>
                    <div className="question" id="question-text">Вопрос появится здесь</div>
                    <div className="button-group" id="answer-buttons"></div>
                    <div id="result" ></div>
                    <button className="btn btn-secondary" id="back-button" >Назад к началу</button>
                </div>
            </div>
         </div>
    )
}

export default Question