import React, {useReducer, useRef, useCallback} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
//import { toIdentifier } from "c:/users/kny/appdata/local/microsoft/typescript/4.7/node_modules/@babel/types/lib/index";


function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

//useReducer
function todoReducer(todos, action) {
  switch(action.type) {
    case 'INSERT' : //추가
    // {type: 'INSERT', todo : {id: 1, text: 'todo', checked: false}}
    return todos.concat(action.todo);

    case 'REMOVE' : //제거
    return todos.filter(todo => todo.id !== action.id);

    case 'TOGGLE' : //수정
    return todos.map(todo =>
      todo.id === action.id? {...todo, checked: !todo.checked} : todo,
    );
    default:
      return todos;
  }
}







const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //고유값으로 사용될 id
  //ref를 사용하여 변수 담기
  const nextId = useRef(2501);
  
  //추가
  const onInert = useCallback(text => { 
    const todo = {
        id: nextId.current,
        text, 
        checked: false,
      };
      dispatch(todos => todos.concat(todo));
      nextId.current +=1; //nextId  1씩 더하기
  }, []);
   
  //삭제
  const onRemove = useCallback(id => {
    dispatch(todos => todos.filter(todo => todo.id !== id));
  }, []);

  //수정
  const onToggle = useCallback(id => {
    dispatch(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  
  return (
    <TodoTemplate>
      <TodoInsert onInsert= {onInert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
