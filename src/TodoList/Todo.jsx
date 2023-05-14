import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, IconButton } from '@mui/material';
// import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const useStyles = makeStyles({
  completedTask: {
    textDecoration: 'line-through',
    color: '#aaa'
  },
  todoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:last-child': {
      marginBottom: 0
    },
    '& .MuiIconButton-root': {
      marginLeft: '8px'
    },
    '& .MuiIconButton-root:first-child': {
      marginLeft: 0,
      marginRight: '8px'
    },
    '&:last-child .MuiIconButton-root': {
      visibility: 'hidden'
    }
  },
  todoText: {
    flexGrow: 1
  }
});

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  const classes = useStyles();

  return (
    <div className={classes.todoRow}>
      <Typography
        className={`${classes.todoText} ${task.completed ? classes.completedTask : ''}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </Typography>
      <div>
        <IconButton onClick={() => editTodo(task.id)}>
          {/* <EditIcon /> */}
        </IconButton>
        <IconButton onClick={() => deleteTodo(task.id)}>
          {/* <DeleteIcon /> */}
        </IconButton>
      </div>
    </div>
  );
};
