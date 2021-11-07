import React, {useState} from 'react';
import addSvg from '../../assets/add.svg'
import axios from 'axios'

const Addtaskform = ({ list, onAddTask }) => {
    const[visibleForm, setFormVisible] = useState(false)
    const[inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }
// debugger
    const addTask = () => {
            const obj = {
                listId: list.id,
                text: inputValue,
                completed: false
            }
            setIsLoading(true)
            axios
            .post('http://localhost:3001/tasks', obj)
            .then(({data}) => {
                onAddTask(list.id, obj)
                toggleFormVisible()
        })
        .catch(() => {
            alert('Ошибка при добавлении списка!')
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="tasks__form">
        {!visibleForm ? (
            <div onClick={toggleFormVisible} className="tasks__form-new">
                <img src={addSvg} alt="add icon" />
                <span>Новая задача</span>
            </div>
        ) : (
            <input  
                value={inputValue}
                className="field" 
                type="text" 
                placeholder="Текст задачи" 
                onChange={e => setInputValue(e.target.value)}
                />

        )}
            <div className="tasks__form-block">
                <button disabled={isLoading} onClick={addTask} className="btn">{isLoading ? 'Добавление' : 'Добавить задачу'}</button>
                <button onClick={toggleFormVisible} className="btn btn--grey">Отмена</button>
            </div>
        </div>
    );
}

export default Addtaskform;
