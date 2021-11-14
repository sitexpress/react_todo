import React from 'react'
import axios from 'axios'
import {Animated} from "react-animated-css"
import 'animate.css/animate.css'

import './Tasks.scss'
import editBtn from '../../assets/edit_btn.svg'
import Addtaskform from './AddTaskForm';
import Task from './Task'

const Tasks = ({lists, onEditTitle, onAddTask, listEmpty, onRemoveTask, onEditTask}) => {

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
                    {!listEmpty && lists.tasks && !lists.tasks.length && (<h2>Задачи отсутствтуют</h2>)}
                    {lists.tasks && lists.tasks.map((task) => (
                        <Task key={task.id} {...task} lists={lists} onRemove={onRemoveTask} onEdit={onEditTask} />
                        ))
                    }
                    <Addtaskform onAddTask={onAddTask} list={lists}/>
                    </div>
                </div>
    );
}

export default Tasks;
