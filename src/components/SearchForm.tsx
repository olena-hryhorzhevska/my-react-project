import { useState } from 'react';

interface SearchFormProps {
  onSubmit: (topic: string) => void;
}

export default function SearchForm({ onSubmit }: SearchFormProps) {
  const [topic, setTopic] = useState('');
  const handleSubmit = (formData: FormData) => {
    const topicFromForm = formData.get('topic') as string;
    if (topicFromForm === '') {
      alert('Please enter search topic!');
      return;
    }
    onSubmit(topicFromForm);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="topic" value={topic} onChange={(e) => {
        setTopic(e.target.value);
      }}/>
      <button type="submit">Search</button>
    </form>
  );
}
