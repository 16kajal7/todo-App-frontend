import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

const ToDo = ({ text, updateMode, deleteToDo }) => {
    const handleEdit = () => {
        console.log('Edit button clicked'); // Debugging line to confirm click
        if (updateMode && typeof updateMode === 'function') {
            updateMode(); // Ensure updateMode is a function
        } else {
            console.error('updateMode prop is not defined or not a function');
        }
    };
    
    const handleDelete = () => {
        console.log('Delete button clicked'); // Debugging line to confirm click
        if (deleteToDo && typeof deleteToDo === 'function') {
            deleteToDo(); // Ensure deleteToDo is a function
        } else {
            console.error('deleteToDo prop is not defined or not a function');
        }
    };

    return (
        <div className="todo">
            <div className="text">{text}</div>
            <div className="icons">
                <BiEdit className='icon' onClick={handleEdit} />
                <AiFillDelete className='icon' onClick={handleDelete} />
            </div>
        </div>
    );
}

export default ToDo;
