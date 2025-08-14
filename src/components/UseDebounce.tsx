import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function UseDebounce() {
  const [text, setText] = useState('Hello');

  const handleChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    },
    1000
  );

  useEffect(() => {
    console.log('Make HHTP request with text:', text);
  }, [text]);

  return (
    <>
      <input type="text" defaultValue={text} onChange={handleChange} />
    </>
  );
}
