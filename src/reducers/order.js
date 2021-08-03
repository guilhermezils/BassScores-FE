const initialState = []

const order = (state=initialState, action) => {

    switch(action.type) {
        case 'ORDER_SUBMIT_SUCCESS':
            
            return [...state, action.order]
        default:
            return state
    }
}

export default order