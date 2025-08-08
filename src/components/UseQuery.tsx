import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPerson = async () => {
  const response = await axios.get(`https://swapi.info/api/people/1`);
  return response.data;
};

export default function UseQueryExample() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ['person'],
    queryFn: fetchPerson,
    // retry: false,
  });

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}
