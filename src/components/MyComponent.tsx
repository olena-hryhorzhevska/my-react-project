import { useId } from 'react';

export default function MyComponent() {
  const fieldId = useId();
  return (
    <>
      <form>
        <label htmlFor={`${fieldId}-username`}>Name</label>
        <input type="text" name="username" id={`${fieldId}-username`} />

        <label htmlFor={`${fieldId}-email`}>Email</label>
        <input type="email" name="email" id={`${fieldId}-email`} />

        <button type="submit">Place order</button>
      </form>
    </>
  );
}
