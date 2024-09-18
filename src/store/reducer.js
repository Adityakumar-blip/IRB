const initialStore = {
    CHECK_DEMO_SURVEY: {
        demo_survey_taken: 'NO',
    },
    FCM_TOKEN: '',
    BACKGROUND_NOTIFICATION: '',
};

const Reducer = (store = initialStore, action) => {
    switch (action.type) {
        case 'GET_DEMO_SURVEY_STATUS':
            return {
                ...store,
                CHECK_DEMO_SURVEY: action.payload,
            };

        case 'GET_FCM':
            return {
                ...store,
                FCM_TOKEN: action.payload,
            };

        case 'GET_BACKGROUND_NOTIFICATION':
            return {
                ...store,
                BACKGROUND_NOTIFICATION: action.payload,
            };

        case 'ON_LOGOUT':
            return initialStore;

        default:
            return store;
    }
};

export default Reducer;
