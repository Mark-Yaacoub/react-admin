import React, { useState } from "react";
import { Box, Button, TextField, Grid } from "@mui/material";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);

  const handleSubmit = (e) => {
    // prevent default action
    e.preventDefault();
    // edit todo
    editTodo(value, task.id);
  };
  return (
    <Box m="20px">
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit} className="TodoForm">
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Add Task"
            placeholder="Update task"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            name="todo-input"
            sx={{ gridColumn: "span 1" }}
          />
          <Button type="submit" color="secondary" variant="contained">
            Update Task
          </Button>
        </form>
      </Grid>
    </Box>
  );
};
