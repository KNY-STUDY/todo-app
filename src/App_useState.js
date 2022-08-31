import React, {useState, useRef, useCallback} from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";


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


const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);

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
      setTodos(todos => todos.concat(todo));
      nextId.current +=1; //nextId  1씩 더하기
  }, []);
   
  //삭제
  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }, []);

  //수정
  const onToggle = useCallback(id => {
    setTodos(todos =>
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
