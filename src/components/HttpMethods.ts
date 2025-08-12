import axios from 'axios';

// This file demonstrates how to use axios for various HTTP methods.
// GET request to fetch all todos
axios
  .get('https://jsonplaceholder.typicode.com/todos')
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

//fetch
fetch('https://jsonplaceholder.typicode.com/todos')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then((data) => {
    console.log(data);
  }).catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  })

// GET request to fetch a specific todo by ID
const todoId1 = 1;

axios
  .get(`https://jsonplaceholder.typicode.com/todos/${todoId1}`)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

//fetch
fetch(`https://jsonplaceholder.typicode.com/todos/${todoId1}`, {
  method: 'GET',
}).then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}).then((data) => {
  console.log(data);
}).catch((error) => {
  console.error('There has been a problem with your fetch operation:', error);
});

// POST request to create a new todo
const newTodo = {
  title: 'C stands for Create',
  completed: false,
};

axios
  .post('https://jsonplaceholder.typicode.com/todos', newTodo)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

// fetch
fetch('https://jsonplaceholder.typicode.com/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newTodo),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

// PATCH request to update an existing todo
const todoId2 = 1;
const todoUpdate = {
  title: 'New todo title',
};

axios
  .patch(`https://jsonplaceholder.typicode.com/todos/${todoId2}`, todoUpdate)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

// fetch
fetch(`https://jsonplaceholder.typicode.com/todos/${todoId2}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(todoUpdate),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });

// DELETE request to remove a todo

const todoId3 = 1;

axios
  .delete(`https://jsonplaceholder.typicode.com/todos/${todoId3}`)
  .then((response) => console.log(response.data))
  .catch((error) => console.log(error));

//fetch
fetch(`https://jsonplaceholder.typicode.com/todos/${todoId3}`, {
  method: 'DELETE',
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
