import React, {useState,useEffect} from 'react'
import './App.css';
import Form from './Form'

const listFromLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list){
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }

}

listFromLocalStorage()

function App() {
  const [list,setList] = useState(listFromLocalStorage())
  const [name,setName] = useState('')
  const [isActive, setIsActive] = useState(false)  
  const [isDark, setIsDark] = useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  const showCompleted = () => {
        setIsComplete(true)
  }

  const submit = () => {
      const newList = {name:name, id: Date.now(), completed: false}
      setList([...list, newList])
      // setTodos([ ...list])
      if(name === ''){
        setList([...list])
      }
      setName('')
  }

  const handleCompleted = (id) => {
    const newList = list.map((item)=> {
      if(item.id === id) {
        return {...item, completed: !item.completed}
      }

      return item
    })
    
    setList(newList)
  }

  const removeTodo = (id) => {
    let newList = list.filter(item => item.id !== id)
    setList(newList)
}

const clearCompleted = ()=> {
  let newList = list.filter(item => !item.completed)
  setList(newList)
}



const showAll = (id) => {
  setList(list)
}
const toggleActive = () => {
  setIsActive(true)  
  setIsComplete(false)
}

const toggleAll = () => {
  setIsActive(false)
  setIsComplete(false)
}

const toggleDarkTheme = () => {
  setIsDark(true)
    document.body.classList.add('body')
  }
  
  const toggleLightTheme = () => {
    setIsDark(false)
    document.body.classList.remove('body')
}

useEffect(() => {
  localStorage.setItem('list', JSON.stringify(list))
}, [list]);

  return (
    <div className={`App ${ isDark && 'dark-theme-bg'}`}>
      <div className='head'>
        <h2>TODO</h2>
        {isDark ? 
        <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleLightTheme} width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" onClick={toggleDarkTheme} width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg> 
      }
        
      </div>
      <Form 
        name={name} 
        submit={submit}
        setName={setName}
        list={list}
        handleCompleted={handleCompleted}
        removeTodo={removeTodo}
        clearCompleted={clearCompleted}
        showAll={showAll}
        isActive={isActive}
        toggleActive={toggleActive}
        toggleAll={toggleAll}
        isDark={isDark}
        showCompleted={showCompleted}
        isComplete={isComplete}
      />
    </div>
  );
}

export default App;
