import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditeForm";
import {
  Typography,
  Box,
  Grid,
  Paper,
  IconButton,
} from "@mui/material";

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import Header from "../components/Header";


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  return (
     <Box m="20px">
        <Header title="Todo" subtitle="Todo List" />

       <Typography variant="h3" align="center" gutterBottom>
         Get Things Done!
       </Typography>
       <TodoForm addTodo={addTodo} />
       {/* display todos */}
       <Grid m="20px">
         {todos.map((todo) =>
           todo.isEditing ? (
             <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
           ) : (
             <Grid item xs={12} key={todo.id}>
               <Paper
                 sx={{
                   display: "flex",
                   alignItems: "center",
                   justifyContent: "space-between",
                   padding: "1rem",
                 }}
               >
                 <Todo
                   task={todo}
                   deleteTodo={deleteTodo}
                   editTodo={editTodo}
                   toggleComplete={toggleComplete}
                 />
                 <div>
                   <IconButton onClick={() => editTodo(todo.id)}>
                     <EditIcon />
                   </IconButton>
                   <IconButton onClick={() => deleteTodo(todo.id)}>
                     <DeleteIcon />
                   </IconButton>
                 </div>
               </Paper>
             </Grid>
           )
         )}
       </Grid>
     </Box>
   );
   
};
