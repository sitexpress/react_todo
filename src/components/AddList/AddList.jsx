import React, { useState, useEffect } from 'react';
import axios from 'axios';

import List from '../List/List';
import './AddList.scss';
import Badge from './../Badge/Badge';
import closeBtn from '../../assets/close_btn.svg';

const AddList = ({colors, onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if(Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        setVisiblePopup(false)
        setInputValue('')
        selectColor(colors[0].id)
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название папки')
            return
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {
            
                "name": inputValue,
                "colorId": selectedColor

        }).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name
            const listObj = {...data, color: {name: color}}
            onAdd(listObj)
            onClose()
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className='add-list'>
            <List 
            onClick={() => setVisiblePopup(!visiblePopup)}
            items={[
                {
                    className: 'list__add-button',
                    icon: (
                    <svg 
                        width="12" 
                        height="12" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                                <path 
                                    d="M8 1V15" 
                                    stroke="black" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                                <path 
                                    d="M1 8H15" 
                                    stroke="black" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"/>
                            </svg>
                            ),
                    name: 'Добавить список',
                }
            ]} />
            {visiblePopup &&             
                <div className="add-list__popup">
                <img 
                    onClick={onClose} 
                    src={closeBtn} 
                    className="add-list__popup-close-btn" alt="close button"/>
                    <input  
                        value={inputValue} 
                        onChange={(e) => {setInputValue(e.target.value)}}
                        className="field" 
                        type="text" 
                        placeholder="Название папки" />
                    <ul className="add-list__popup-colors">
                        {colors.map(item => (
                            <Badge onClick={()=> {selectColor(item.id)}} 
                            key={item.id} 
                            name={item.name}
                            className={(selectedColor === item.id || useState === colors[0].name) && 'selected'}
                            />
                        ))}
                    </ul>
                    <button onClick={addList} className="btn">
                        {isLoading ? 'Добавление...' : 'Добавить'}
                    </button>
                </div>
            }

        </div>
    )
}

export default AddList; 