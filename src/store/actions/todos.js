import axios from 'axios';

export const ADD_TODO = 'ADD_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const FETCH_TODOS = 'FETCH_TODOS'

function fetchDispatch(todos) {
    return {
      type: FETCH_TODOS,
      payload:todos
    }
  }
  function editTodos(todos) {
    console.log(todos,"edit todos")
    return {
      type: EDIT_TODO,
      payload:todos
    }
  }
  
export function fetch() {
    return dispatch => {
      // We dispatch started to kickoff the call to the API
      
      return axios.get('https://jsonplaceholder.typicode.com/todos/')
        .then(function(response){
          // Dispatch the success action
          let items = response.data.slice(0, 30)
          console.log(items)
          dispatch(fetchDispatch(items));
         
        })
    }
  }
  export function edit(todos) {
    return dispatch => {
          console.log(todos)
          dispatch(editTodos(todos));
       
    }
  }