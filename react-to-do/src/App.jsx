import { useEffect, useState } from 'react'
import './style.css'


function App() {

  const [newItem, setNewItem] = useState("")
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null ) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
   localStorage.setItem("ITEMS", JSON.stringify(todos))
  },[todos])
 
  function handleChange(e) {
    setNewItem(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
     setTodos((prevState) => {
      return [...prevState,
    {id: crypto.randomUUID(), title: newItem, completed: false},]
      })

    }

   

    function toggleTodo(id,completed) {
      setTodos(prevState => {
        return prevState.map(todo => {
          if (todo.id === id) {
            return{ ...todo, completed }
          }
          return todo
        })
      })
    }

    function deleteTodo(id) {
      setTodos(prevState => {
        return prevState.filter(todo => todo.id !== id)
      })
    }


  return(
    <>
    <form onSubmit={handleSubmit} className="new-item-form">
    <div className="form-row">
    <label htmlFor="item">New Item</label>
    <input type="text" id="item" name="item" value={newItem} onChange={handleChange} />
    </div>
    <button className="btn">Add Item</button>
    </form>
    <h1 className="header">To Do List</h1>
    <ul className="list">
    {todos.length === 0 &&  "No Todos"}
    {todos.map((todo) => {
     return <li key={todo.id}>
     <label>
       <input type="checkbox" checked={todo.completed} onChange={e => toggleTodo(todo.id, e.target.checked)}/>
       {todo.title}
     </label>
     <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger">Delete</button>
   </li>
    })}
    </ul>
    </>
  )
}

export default App
