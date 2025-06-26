import api from "./api"
// Users

export const getUser = async ({telegram_user_id}) => {
    const response = await api.get('auth-user/', {
        params: {
            telegram_user_id: telegram_user_id
        }
    })
    return response.data
}

export const registerUser = async ({telegram_user_id, name, position}) => {
    const response = await api.post('auth-user/', {
        telegram_user_id: telegram_user_id,
        name: name,
        position: position
    })
    return response.data
}

// Tests

export const getTest = async ({telegram_user_id}) => {
    const response = await api.get('get-test/', {
        params : {
            telegram_user_id: telegram_user_id
        }
    })
    return response.data
}

// Result 

export const checkResult = async ({telegram_user_id, test_id, answers}) => {
    const response = await api.post('check-test/', {
        telegram_user_id: telegram_user_id,
        test_id: test_id,
        answers: answers
    })

    return response.data
}


// Positions

export const getPositions = async () => {
    const response = await api.get('get-positions/')
    return response.data
} 

