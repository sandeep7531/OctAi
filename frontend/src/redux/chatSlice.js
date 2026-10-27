import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChatId: localStorage.getItem("activeChatId") || null,
    messagesMap: {}, // { [conversationId]: Array<Message> }
    isLoading: false,
    isFetchingChats: false,
  },
  reducers: {
    setActiveChatId: (state, action) => {
      state.activeChatId = action.payload;
      if (action.payload) {
        localStorage.setItem("activeChatId", action.payload);
      } else {
        localStorage.removeItem("activeChatId");
      }
    },
    setChatMessages: (state, action) => {
      const { conversationId, messages } = action.payload;
      state.messagesMap[conversationId] = messages;
    },
    appendMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      if (!state.messagesMap[conversationId]) {
        state.messagesMap[conversationId] = [];
      }
      state.messagesMap[conversationId].push(message);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsFetchingChats: (state, action) => {
      state.isFetchingChats = action.payload;
    },
    clearChatState: (state) => {
      state.activeChatId = null;
      state.messagesMap = {};
      state.isLoading = false;
      state.isFetchingChats = false;
      localStorage.removeItem("activeChatId");
    },
  },
});

export const {
  setActiveChatId,
  setChatMessages,
  appendMessage,
  setIsLoading,
  setIsFetchingChats,
  clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
