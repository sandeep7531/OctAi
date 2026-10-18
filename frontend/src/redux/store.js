import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import conversationReducer from "./conversationSlice";
import chatReducer from "./chatSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        conversation: conversationReducer,
        chat: chatReducer,
    }
});

export default store;