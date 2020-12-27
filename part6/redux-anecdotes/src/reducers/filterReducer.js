export const filterAnecdotes = (filteringStr) => { 
    return {
        type: 'FILTER',
        data: { filteringStr: filteringStr }
    }
}

const filterReducer = (state = "", action) => {
    switch (action.type) {
        case 'FILTER':
            return "".concat("", action.data.filteringStr)
        default: return state
    }
}

export default filterReducer