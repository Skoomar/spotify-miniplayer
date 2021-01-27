// here we set up the React Context API

export const initialState = {
    user: null,
    token: null,
    playlists: [],
    spotify: null,
    playing: false,
    progress: "0",
    shuffle_state: false,
    repeat_state: "off",
    item: null,
};

// we set some actions which we will require
// and save the user's authentication details and the playlist details in the state
const reducer = (state, action) => {
    // console.log(action);

    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            };
        case "SET_PLAYING":
            return {
                ...state,
                playing: action.playing,
            };
        case "SET_PROGRESS":
            return {
                ...state,
                progress: action.progress_ms,
            }
        case "SET_SHUFFLE":
            return {
                ...state,
                shuffle_state: action.shuffle_state,
            };
        case "SET_REPEAT":
            return {
                ...state,
                repeat_state: action.repeat_state,
            };
        case "SET_VOLUME":
            return {
                ...state,
                volume: action.device?.volume_percent,
            }
        case "SET_ITEM":
            return {
                ...state,
                item: action.item,
            };
        case "SET_TOKEN":
            return {
                ...state,
                token: action.token,
            };
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        case "SET_PLAYLISTS":
            return {
                ...state,
                playlists: action.playlists,
            };
        case "SET_DISCOVER_WEEKLY":
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        default:
            return state;
    }
};

export default reducer;