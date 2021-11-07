import axios from 'axios'
import './List.scss'
import '../Badge/Badge.scss'
import classNames from 'classnames';
import Badge from './../Badge/Badge'
import removeBtn from '../../assets/remove_btn.svg'

const List = ({items, onRemove, isRemovable, onClick, onClickOnItem, activeItem}) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return ( 
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li onClick={onClickOnItem ? () => onClickOnItem(item) : null}
                    key={index} 
                    className={classNames(item.className, {active: item.active 
                    ? item.active 
                    : activeItem && activeItem.id === item.id})}>
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
                            onClick={() => removeList(item)}
                            />
                        )}
                </li>
            ))}
        </ul>
    )
}

export default List;