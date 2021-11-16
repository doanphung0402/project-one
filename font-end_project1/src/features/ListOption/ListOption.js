import { createSlice } from "@reduxjs/toolkit";

const listOption = createSlice({
     name : "OptionList", 
     initialState: {
         ListOption : []
     },
     reducers : {      
      addListOption :(state,action) =>{ 
         state.ListOption.push(action.payload) ; 
      }, 
      deleteOption :(state,action)=>{
          state.ListOption.splice(action.payload.index,1)
      }
     }
})

const {actions,reducer} = listOption; 
export const {addListOption,deleteOption} = actions; 
export default reducer ; 
