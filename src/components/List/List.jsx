import React from 'react';
import axios from 'axios'
import classNames from 'classnames';
import {Animated} from "react-animated-css";
import 'animate.css/animate.css';

import './List.scss'
import '../Badge/Badge.scss'
import Badge from './../Badge/Badge'
import removeBtn from '../../assets/remove_btn.svg'

const List = ({items, onRemove, isRemovable, onClick, onClickOnItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            addClassName(item)
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }
    console.log('items from list:', items)

    const addClassName = (item) => {
        item.className = "animate__zoomOutLeft"
        console.log('done')
    }

    return ( 
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li onClick={onClickOnItem 
                    ? () => onClickOnItem(item)
                    : null}
                    key={index} 
                    className={classNames(item.className, {"active animate__bounceIn": item.active
                    ? item.active : activeItem && activeItem.id === item.id})}>
                    <i>
                        {item.icon ? item.icon : <Badge name={item.color.name}/>}
                    </i>

                    <span>
                        {item.name}
                        {item.tasks && ` (${item.tasks.length})`} 
                    </span>
                    
                    {isRemovable && (
                        <img 
                            className="list__removeBtn list__addBtn" 
                            src={removeBtn} 
                            alt="remove icon"
                            onClick={() => {
                                    removeList(item)
                                }
                            }
                            />
                        )}
                </li>
            ))}
        </ul>
    )
}

export default List;