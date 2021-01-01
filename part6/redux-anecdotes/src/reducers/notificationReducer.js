const showNotification = (notification) => { 
    return {
        type: 'SHOW_NOTIFICATION',
        data: { notification: notification }
    }
}

const hideNotification = () => { 
    return {
        type: 'HIDE_NOTIFICATION',
        data: { notification: "" }
    }
}

let timer

export const setNotification = (notification, sec) => { 
    return dispatch => {
        dispatch(showNotification(notification))
        clearTimeout(timer)
        timer = setTimeout(() => dispatch(hideNotification()), sec*1000)
    }
}

const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return "".concat("", action.data.notification)
        case 'HIDE_NOTIFICATION':
            return "".concat("", action.data.notification)
        default: return state
    }
}

export default notificationReducer