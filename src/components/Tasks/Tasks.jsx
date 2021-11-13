import React from 'react'
import axios from 'axios'
import {Animated} from "react-animated-css"
import 'animate.css/animate.css'

import './Tasks.scss'
import editBtn from '../../assets/edit_btn.svg'
import Addtaskform from './AddTaskForm';

const Tasks = ({lists, onEditTitle, onAddTask, listEmpty}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', lists.name)
        if (newTitle) {
            onEditTitle(lists.id, newTitle)
            axios.patch('http://localhost:3001/lists/' + lists.id, {
                name: newTitle
            }).catch(() => {
                alert('Не удалось обновить название списка!')
            })
        }
    }

    return (
        
                <div className="tasks">
                    <h2  style={{color: lists.color.hex}} className="tasks__title">
                        {lists.name} 
                        <img onClick={editTitle} src={editBtn} alt="edit icon" />
                    </h2>

                    <div className="tasks__items">
                    {!listEmpty && !lists.tasks.length ? <h2>Задачи отсутствтуют</h2> : 
                    lists.tasks.map((task) => (
                            <div key={task.id} className="tasks__items-row">
                            <div htmlFor="" className="checkbox">
                                <input id={`task-${task.id}`} type="checkbox" />
                                <label htmlFor={`task-${task.id}`}>
                                    <svg 
                                        width="11" 
                                        height="8" 
                                        viewBox="0 0 11 8" 
                                        fill="none" 
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" 
                                            stroke="black" 
                                            strokeWidth="1.5" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round"/>
                                    </svg>
                                </label>
                            </div>
                            <input readOnly value={task.text} />
                        </div>
                        ))
                    }
                    <Addtaskform onAddTask={onAddTask} list={lists}/>
                    </div>
                </div>
    );
}

export default Tasks;
