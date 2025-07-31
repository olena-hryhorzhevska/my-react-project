// src/components/App.tsx

import Product from './Product';
import css from './App.module.css';
import Alert from './Alert';
import Button from './Button';
import ClickCounter from './ClickCounter';
import { useState } from 'react';
import OrderForm from './OrderForm';
import SearchForm from './SearchForm';
import { Article } from '../types/article';
import ArticleList from './ArticleList';
import { fetchArticles } from '../services/articleService';

const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log("I'm a button!");
  console.log(event);
};

interface Values {
  x: number;
  y: number;
}

export default function App() {
  const [values, setValues] = useState<Values>({ x: 0, y: 0 });

  const updateValue = (key: keyof Values) => {
    setValues({
      ...values,
      [key]: values[key] + 1,
    });
  };

  // const updateX = () => {
  //   setValues({
  //     ...values,
  //     x: values.x + 1
  //   })
  // };
  // const updateY = () => {
  //   setValues({
  //     ...values,
  //     y: values.y + 1
  //   })
  // };

  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleClicks = () => {
    setCount(count + 1);
  };

  const toggleMessage = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form.username.value);

    const formData = new FormData(form);
    const username = formData.get('username');
    console.log('Username:', username);

    form.reset();
  };

  const handleSubmit2 = (formData: FormData) => {
    const username = formData.get('usernamee') as string;
    console.log('Name:', username);
  };

  const handleSubmit3 = (formData: FormData) => {
    const username = formData.get('usernameee') as string;
    console.log('Name:', username);
  };

  const handleOrder = (data: string) => {
    console.log('Order received from:', data);
  };

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetchArticles(topic);
      setArticles(response);
    } catch {
      setIsError(true);
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p>
        x: {values.x}, y: {values.y}
      </p>
      <button onClick={() => updateValue('x')}>Update x</button>
      <button onClick={() => updateValue('y')}>Update y</button>

      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />

      <button onClick={handleClicks}> Clicked: {count}</button>
      <button onClick={toggleMessage}>
        {isOpen ? 'Hide Message' : 'Show Message'}
      </button>
      {isOpen && <p>🎉 Surprise! You toggled me.</p>}

      <h1>Best selling</h1>
      <Product
        name="Tacos With Lime"
        imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
        price={10.99}
      />
      <Product
        name="Fries and Burger"
        imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
        price={14.29}
      />
      <p className={css.email}>Please update your email!</p>
      <Alert type="error" />
      <Button variant="primary" text="Login" />
      <Button variant="secondary" text="Follow" />
      <button onClick={handleClick2}>First button</button>
      <button onClick={(event) => console.log(event)}>Second button</button>

      <form
        onSubmit={handleSubmit}
        style={{ marginTop: '50px', marginBottom: '50px' }}
      >
        <input type="text" name="username" />
        <button type="submit">Submit</button>
      </form>

      <form action={handleSubmit2}>
        <input type="text" name="usernamee" />
        <button type="submit">Submit</button>
      </form>

      <form action={handleSubmit3}>
        <input type="text" name="usernameee" defaultValue="John Doe" />
        <button type="submit">Submit</button>
      </form>

      <h1>Place your order</h1>
      <OrderForm onSubmit={handleOrder} />

      <SearchForm onSubmit={handleSearch} />
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && !isError && <ArticleList items={articles} />}
    </>
  );
}
