const initialState = {
    loading: false,
    error: null,
    data: {
        passportFront: null,
        passportBack: null,
        emirates : null,
    },
    userInfo: null,
    verified: false,
};

const kycReducers = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FILE":
            return {
                ...state,
                data: {
                    ...state.data,
                    [action.payload.key]: action.payload.file,
                },
        };

        case "CLEAR_FILES":
        return {
            ...state,
            data: {
                    passportFront: null,
                    passportBack: null,
                    emirates: null,
                },
        };
        case 'KYC_REQUEST':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'KYC_SUCCESS':
            return {
                ...state,
                loading: false,
                verified: true,
                error: null,
                userInfo: action.payload.data
            };
        case 'KYC_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                verified: false,
            };
        case 'KYC_RESET':
            return initialState;
        default:
            return state;
    }
};

export default kycReducers;