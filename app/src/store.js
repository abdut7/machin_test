import { configureStore,createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentQuestionIndex: 0,
    answers: [],
  };

  const surveySlice = createSlice({
    name: 'survey',
    initialState,
    reducers: {
      setCurrentQuestionIndex: (state, action) => {
        state.currentQuestionIndex = action.payload;
      },
      setAnswer: (state, action) => {
        state.answers.push(action.payload)
      },
    },
  });

export const { setCurrentQuestionIndex, setAnswer } = surveySlice.actions;

export default surveySlice.reducer;

export const store=configureStore({
    reducer:{
        survey:surveySlice.reducer
    }
})