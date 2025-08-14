import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface FetchPostsResponse {
  posts: Post[];
}

const fetchPosts = async (searchText: string): Promise<Post[]> => {
  const res = await axios.get<FetchPostsResponse>(
    'https://dummyjson.com/posts/search',
    {
      params: {
        q: searchText,
      },
    }
  );
  return res.data.posts;
};

export default function DummyApiDebounce() {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: posts, isFetching } = useQuery({
    queryKey: ['posts', searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = useDebouncedCallback((e) => {
    setSearchQuery(e.target.value);
  }, 300);

  return (
    <>
      <input
        type="text"
        defaultValue={searchQuery}
        onChange={updateSearchQuery}
        placeholder="Search posts"
      />
      {isFetching && <p>Loading posts...</p>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
