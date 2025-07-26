import clsx from 'clsx';
import css from './Alert.module.css';

// const isPrimary = true;
// const isDisabled = false;

// const myClassName = clsx(
//   "btn",
//   isPrimary && "btn-primary",
//   isDisabled && "btn-disabled"
// );

// console.log(myClassName); // "btn btn-primary"

interface AlertProps {
  type?: 'success' | 'error';
}

export default function Alert({ type }: AlertProps) {
  return (
    <p className={clsx(css.alert, type && css[type])}>
      This is a default alert text
    </p>
  );
}
