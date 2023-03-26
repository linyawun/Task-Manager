import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const TaskDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <div className='dropdown'>
      <Dropdown>
        <Dropdown.Toggle
          variant=''
          id='dropdown-basic'
          className='dotBtn rounded-pill'
        >
          <span>
            <i className='bi bi-three-dots-vertical'></i>
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='text-primary' container='body'>
          <Dropdown.Item onClick={handleEdit}>
            <i className='bi bi-pencil-square me-2 text-secondary'></i>Edit
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDelete}>
            <i className='bi bi-trash3 me-2 text-danger'></i>Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default TaskDropdown;
