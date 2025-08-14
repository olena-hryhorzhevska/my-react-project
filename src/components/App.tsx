// src/components/App.tsx

import Product from './Product';
import css from './App.module.css';
import Alert from './Alert';
import Button from './Button';
import ClickCounter from './ClickCounter';
import MyComponent from './MyComponent';
import OrderForm from './OrderForm';
import SearchForm from './SearchForm';
import ArticleList from './ArticleList';
import Timer from './Timer';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import { useId } from 'react';
import { Article } from '../types/article';
import { fetchArticles } from '../services/articleService';
import axios from 'axios';
import UseQueryExample from './UseQuery';
import UseQueryDynamic from './UseQueryDynamic';
import UseQueryEnabled from './UseQueryEnabled';
import OrderFormFormik from './OrderFormFormik';
import UseMutation from './UseMutation';
import UseDebounce from './UseDebounce';
import DummyApiDebounce from './DummyApiDebounce';
import { useWindowWidth } from '../hooks/useWindowWidth';
import { useWindowSize } from 'react-use';

// const myKey = import.meta.env.VITE_API_KEY;

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
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrder2 = (formData: FormData) => {
    const delivery = formData.get('delivery') as string;
    console.log('Delivery:', delivery);
  };

  const handleOrder3 = (formData: FormData) => {
    const restrictions = formData.getAll('restrictions') as string[];
    console.log('Dietary restrictions:', restrictions);
  };

  const selectId = useId();

  const handleOrder4 = (formData: FormData) => {
    const deliveryTime = formData.get('deliveryTime') as string;
    console.log('Preferred delivery time:', deliveryTime);
  };

  const [person, setPerson] = useState(null);
  const [count2, setCount2] = useState(1);

  useEffect(() => {
    console.log('Effect ran!');
    axios
      .get(`https://swapi.info/api/people/${count2}`)
      .then((response) => setPerson(response.data));
  }, [count2]);

  useEffect(() => {
    console.log('Effect ran!');
    async function fetchData() {
      const response = await axios.get(
        `https://swapi.info/api/people/${count2}`
      );
      setPerson(response.data);
    }
    fetchData();
  }, [count2]);

  const [clicks2, setClicks2] = useState(0);

  // useEffect(() => {
  //   console.log('You can see me only once!');
  // }, []);

  const [isOpen2, setIsOpen2] = useState(false);

  const [count3, setCount3] = useState(0);

  useEffect(() => {
    console.log(`Effect ran for: ${count3}`);

    return () => {
      console.log(`Clean up for ${count3}`);
    };
  }, [count3]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [clicks3, setClicks3] = useState(() => {
    const savedClicks = localStorage.getItem('saved-clicks');
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('saved-clicks', JSON.stringify(clicks3));
  }, [clicks3]);

  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const windowWidth = useWindowWidth();
  const { width } = useWindowSize();





  return (
    <div>
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
      <MyComponent />

      <form action={handleOrder2}>
        <fieldset>
          <legend>Delivery method:</legend>

          <label>
            <input type="radio" name="delivery" value="pickup" defaultChecked />
            Pickup
          </label>
          <label>
            <input type="radio" name="delivery" value="courier" />
            Courier
          </label>
          <label>
            <input type="radio" name="delivery" value="drone" />
            Drone delivery
          </label>
        </fieldset>

        <button type="submit">Place order</button>
      </form>

      <form style={{ marginTop: '30px' }} action={handleOrder3}>
        <fieldset style={{ display: 'flex', gap: '20px' }}>
          <legend>Dietary restrictions:</legend>
          <label>
            <input type="checkbox" name="restrictions" value="vegan" />
            Vegan
          </label>
          <label>
            <input type="checkbox" name="restrictions" value="gluten-free" />
            Gluten-free
          </label>
          <label>
            <input type="checkbox" name="restrictions" value="nut-free" />
            Nut-free
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      <form
        action={handleOrder4}
        style={{ marginTop: '30px', display: 'flex', flexDirection: 'column' }}
      >
        <label style={{ marginBottom: '10px' }} htmlFor={selectId}>
          Preferred delivery time
        </label>
        <select name="deliveryTime" id={selectId} defaultValue="">
          <option value="" disabled hidden>
            -- Choose delivery time --
          </option>
          <option value="morning">Morning (8:00–12:00)</option>
          <option value="afternoon">Afternoon (12:00–16:00)</option>
          <option value="evening">Evening (16:00–20:00)</option>
        </select>

        <button type="submit" style={{ display: 'block', width: '120px' }}>
          Place order
        </button>
      </form>

      <h2>The count is {count2}</h2>
      <button onClick={() => setCount2(count2 + 1)}>Get next character</button>
      <pre>{JSON.stringify(person, null, 2)}</pre>

      <button onClick={() => setClicks2(clicks2 + 1)}>
        You clicked {clicks2} times
      </button>

      <button onClick={() => setIsOpen2(!isOpen2)}>
        {isOpen2 ? 'Hide timer' : 'Show timer'}
      </button>
      {isOpen2 && <Timer />}

      <button onClick={() => setCount3(count3 + 1)}>Count is {count3}</button>

      <h1>Main content of the page</h1>
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2>Custom Modal Content</h2>
          <p>This is a reusable modal with dynamic content.</p>
        </Modal>
      )}

      <button onClick={() => setClicks3(clicks3 + 1)}>
        You clicked {clicks3} times
      </button>
      <button onClick={() => setClicks3(0)}>Reset</button>

      <UseQueryExample />

      <UseQueryDynamic />

      <UseQueryEnabled />

      <OrderFormFormik />

      <UseMutation />

      <input type="text" value={inputValue} onChange={handleChange} />
      <p>{inputValue}</p>

      <UseDebounce />

      <DummyApiDebounce />

      <p style={{ fontWeight: 'bold' }}>
        Current window width (own hook):{' '}
        <span style={{ color: 'red' }}>{windowWidth}px</span>
      </p>

      <p style={{ fontWeight: 'bold' }}>
        Current window width:{' '}
        <span style={{ color: 'red' }}>{width}px</span>
      </p>
    </div>
  );
}
