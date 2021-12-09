import React from 'react';
import Checkbox from './Checkbox'
import { motion, AnimatePresence } from 'framer-motion';

const Form = ({name, setName, submit, list, handleCompleted, removeTodo, clearCompleted, isDark, isActive, toggleAll, toggleActive, showCompleted, isComplete}) => {

    
    const handleSubmit = (e) => {
        e.preventDefault();
        submit()
    }

    const handleTodoClick = (e) => {
        const classlist = e.target.classList
        if(classlist.contains('present')){
            classlist.add('show')
        }
        else {
            classlist.add('hide')
        }
    }
    
    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='create a new todo' style={{
                    background: isDark && 'hsl(233, 14%, 35%)',
                    color: isDark && 'rgb(185, 193, 199)'
                    }} value={name} onChange={(e)=> setName(e.target.value)} 
                />
                <motion.div 
                    className={`todos ${isComplete && 'hide-todo'} ${isDark && 'todos-two'} ${isActive && 'show-todo'}`} style={{display: list.length < 1 && 'none'}}
                    initial={{ x: "-100vw", opacity: 0}}
                    animate={{ x: 0, opacity: 1}}
                    transition={{type: 'spring', delay: 0.5, stiffness: 300}}
                >
                {list.map((item) => {
                    const {name,id,completed} = item
                    
                    return (
                        <AnimatePresence key={id}>
                            <motion.div  
                                className={`todo ${!isDark && 'todo-two'} ${!completed ? 'show' : 'hide'}`} 
                                key={id} 
                                onClick={handleTodoClick}
                                initial={{ y: -"100vw", opacity: 0}}
                                animate={{ y: 10, opacity: 1}}
                                transition={{duration:.5, ease: "easeInOut", type: 'string'}}
                                exit={{x: '-100vh', opacity: 0}}
                                
                            >
                                <div 
                                onClick={()=> handleCompleted(id)} 
                                className={ `${completed && 'present'}`}>
                                    {completed && <Checkbox />}
                                </div>
                                <h5 className={ `${isDark && 'dark-theme'}  ${completed && 'complete present'}`}  onClick={()=>handleCompleted(id)}>{name}</h5>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                className='cross cross-two' 
                                onClick={()=> removeTodo(id)} width="18" height="18"><path fill={`${isDark ? 'hsl(236, 9%, 61%)' : '#494C6B'}`} fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
                            </motion.div>
                        </AnimatePresence>
                    )
                    
                })} 
                    <div className='info'>
                        <p>{list.length} items left</p>
                        <p onClick={()=> clearCompleted()}>clear completed</p>
                        <div className='footer-two'>
                            <button onClick={toggleAll}>All</button>
                            <button onClick={toggleActive}>Active</button>
                            <button onClick={showCompleted}>Completed</button>
                        </div >
                    </div>
                </motion.div>
            </form>
            <footer className='separate-footer' 
                style={{
                background: isDark && 'hsl(233, 14%, 35%)',
                display: list.length <= 0 && 'none'
                }}>
                <button onClick={toggleAll}>All</button>
                <button onClick={toggleActive}>Active</button>
                <button onClick={showCompleted}>Completed</button>
            </footer>
            <motion.div className='footer' style={{display: list.length < 1 && 'none'}} >Drag and drop to reoder list</motion.div>
        </div>
    );
}

export default Form;
