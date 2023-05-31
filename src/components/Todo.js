import React, { useState, useEffect } from 'react';
import DeleteIcon from '../icons/delete.svg';
import EditIcon from '../icons/edit.svg';
import ExtendIcon from '../icons/extend.svg';
import TickIcon from '../icons/tick.svg';
import ShrinkIcon from '../icons/shrink.svg';
import separateCompleted from '../utils/separeteCompleted';

export default function Todo({ globalEditMode, setGlobalEditMode, editTrigger, setEditTrigger, todos, todo, setTodos }) {
    const [extended, setExtended] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(todo.name);
    const [desc, setDesc] = useState(todo.description);
    const [deadline, setDeadline] = useState(todo.deadline);

    const saveChanges = () => {
        const modifiedCopy = [];
        todos.forEach((prevTodo) => {
            if (prevTodo.id === todo.id) {
                modifiedCopy.push({
                    ...prevTodo, 
                    name: name,
                    description: desc,
                    deadline: deadline
                });
            }
            else 
                modifiedCopy.push(prevTodo);
        });
        setTodos(modifiedCopy);
        /*
        setTodos((prevTodos) => {
            return prevTodos.map((prevTodo) => {
                if (prevTodo.id === todo.id) {
                    return {
                        ...prevTodo, 
                        name: name,
                        description: desc,
                        deadline: deadline
                    }
                }
                return prevTodo;
            });
        })
        */
    }

    const deleteTodo = () => {
        setTodos((prevTodos) => prevTodos.filter((prevTodo) => (prevTodo.id !== todo.id)));
    }

    function extendTodo() {
        setExtended((prevExtended) => {
            if (prevExtended) {
                setEditMode(false);
                saveChanges();
                return false;
            }
            else {
                return true;
            }
        })
    }
    function toggleTodo() {
        const modifiedCopy = [];
        todos.forEach((prevTodo) => {
            if (prevTodo.id !== todo.id) {
                modifiedCopy.push(prevTodo);
            }
        });
        todos.forEach((prevTodo) => {
            if (prevTodo.id === todo.id) {
                modifiedCopy.push({
                    ...prevTodo, completed: !todo.completed
                });
            }
        });
        setTodos(separateCompleted(modifiedCopy));

        /*
        setTodos((prevTodos) => {
            setExtended((prevExtended) => {
                if (prevExtended)
                    return false;
            });
            /*
            prevTodos.forEach((prevTodo) => {
                if (prevTodo.id === todo.id) {
                    return {
                        ...prevTodo, completed: !todo.completed
                    }
                }
                return prevTodo;
            });
        });
        */
    }

    const manageEdit = () => {
        setEditMode((prevEditMode) => !prevEditMode);
        saveChanges();
    }

    useEffect(() => {
        const modifiedCopy = todos.map((prevTodo) => {
            if (prevTodo.id !== todo.id && editMode) {
                return {
                    ...prevTodo,
                    editable: false
                }
            }
            return {
                ...prevTodo,
                editable: true
            }
        });
        setTodos(modifiedCopy);
    }, [editMode, todos])

    return (
        <div className='edit-box'>
            <div className='first-line'>
                <div className='flex'>
                    {editMode
                        ? <input placeholder={todo.name} value={name} onChange={(e) => setName(e.target.value)}></input> 
                        : <p className={`${todo.completed ? 'completed' : ''}`}>{todo.name}</p>
                    }
                </div>
                <div className='manage-buttons'>
                    {(todo.editable) ? <img src={EditIcon} onClick={() => manageEdit()}  style={{width: '20px', height: '20px'}} alt='edit to-do'></img> : <></>}
                    <button style={{border: 'none', backgroundColor: 'white', padding: 0, width: '20px', height: '20px'}} onClick={toggleTodo} disabled={editMode}>
                        <img src={TickIcon} style={{width: '20px', height: '20px'}} alt='toggle to-do'></img>
                    </button>
                    <img onClick={extendTodo} src={extended ? ShrinkIcon : ExtendIcon} style={{width: '20px', height: '20px', marginRight: '40px'}} alt='resize to-do'></img>
                    <img onClick={() => deleteTodo()} src={DeleteIcon} style={{width: '20px', height: '20px'}} alt='delete to-do'></img>
                </div>
            </div>
            {extended && 
            <>
                {
                    editMode 
                        ? <textarea placeholder={todo.description} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                        : <p className='description'>{todo.description}</p>
                }
                {
                    editMode 
                        ? <input type='date' value={deadline} onChange={(e) => setDeadline(e.target.value)}></input>
                        : <p className='deadline'>Due to: {todo.deadline}</p>
                }
            </>}
        </div>
    )
}
