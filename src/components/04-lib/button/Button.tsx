import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  secondary?: boolean;
  full?: boolean;
  children: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-secondary': props.secondary,
    'btn-primary': !props.secondary,
    'w-full': props.full,
  });

  return <div className={btnClass}>{props.children}</div>;
};

export { Button };
