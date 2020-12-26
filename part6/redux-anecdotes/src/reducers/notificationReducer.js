export const createNotification = (notification) => { 
    return {
        type: 'CREATE',
        data: { notification: notification}
    }
}

const notificationReducer = (state = "initial state", action) => {
    switch (action.type) {
        case 'CREATE':
            return "".concat("", action.data.notification)
        default: return state
    }
}

export default notificationReducer