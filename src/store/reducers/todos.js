import {
    ADD_TODO, EDIT_TODO, REMOVE_TODO, FETCH_TODOS,
  } from '../actions/todos'
  
  const initialState = {
   
    todos: []
  }
  
  export default (state = initialState, action) => {
   
    switch (action.type) {
      case ADD_TODO:
        return {
          ...state,
          isFetching: true,
          hasFailed: false,
        }
      case EDIT_TODO:
        return {
          ...state,
          hasFailed: false,
          list: {
            ...state.list,
            [action.payload.workspace_id]: action.payload.resources
          }
        }
      case REMOVE_TODO:
        return {
          ...state,
          hasFailed: false,
          list: {
            ...state.list,
            [action.payload.workspace_id]: [
              ...state.list[action.payload.workspace_id],
              {
                id: action.payload.id,
                name: action.payload.name,
                url: '/resources/'+action.payload.id,
                icon: 'fa fa-rocket'
              }
            ]
          }
        }
        case FETCH_TODOS:
        return{
          ...state,
         todos:action.payload
          }
        
        break;
      
      default:
        return state
    }
  }
  