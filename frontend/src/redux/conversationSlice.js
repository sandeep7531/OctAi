import { createSlice } from "@reduxjs/toolkit";


const conversationSlice = createSlice({
    name: "conversation",
    initialState: {
        conversations: []
    },
    reducers: {
        setConversations: (state, action) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action) => {
            state.conversations = [action.payload, ...state.conversations];
        },
        deleteConversation: (state, action) => {
            const id = action.payload;
            state.conversations = state.conversations.filter((c) => (c._id || c.id) !== id);
        },
        updateConversation: (state, action) => {
            const { id, title } = action.payload;
            state.conversations = state.conversations.map((c) =>
                (c._id || c.id) === id ? { ...c, title } : c
            );
        }
    }
})

export const { setConversations, addConversation, deleteConversation, updateConversation } = conversationSlice.actions;

export default conversationSlice.reducer;
