import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// useMutation({
//   mutationFn: async (data) => {
//     // HTTP-request
//   },
//   onSuccess: (data) => {
//     // Mutation success!
//   },
//   onError: (error) => {
//     // An error happened!
//   },
// });

type CreateTodo = { title: string; completed: boolean }; // TVariables
type Todo = { id: number; title: string; completed: boolean }; // TData

export default function App() {
  const queryClient = useQueryClient();
  const mutation = useMutation<Todo, Error, CreateTodo>({
    mutationFn: async (newTodo) => {
      const res = await axios.post<Todo>(
        'https://jsonplaceholder.typicode.com/todos',
        newTodo
      );
      return res.data; // тип: Todo
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({queryKey: ['todos']}); // сброс кэша
      console.log('Todo added successfully', data.id);
    },
  });

  const handleCreateTodo = () => {
    mutation.mutate({ title: 'My new todo', completed: false }); // аргумент: CreateTodo
    
  };

  return (
    <>
      <button onClick={handleCreateTodo}>Create Todo</button>
      {mutation.isPending && <div>Adding todo...</div>}
      {mutation.isError && <div>An error occurred</div>}
      {mutation.isSuccess && <div>Todo added!</div>}
    </>
  );
}
