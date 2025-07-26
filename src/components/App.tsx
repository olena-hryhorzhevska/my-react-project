// src/components/App.tsx

import Product from './Product';
import css from './App.module.css';
import Alert from './Alert';
import Button from './Button';
import ClickCounter from './ClickCounter';
import { useState } from 'react';

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
    </>
  );
}
