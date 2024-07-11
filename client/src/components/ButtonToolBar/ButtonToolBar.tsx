import { FC } from "react";
import { IconType } from "react-icons";
import { type VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button-variants";

interface IContentButton {
  icon?: IconType;
  text?: string;
}

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    IContentButton,
    VariantProps<typeof buttonVariants> {}

const ButtonToolBar: FC<IButtonProps> = ({
  size,
  className,
  checked,
  icon: Icon,
  text,
  ...props
}) => {
  return (
    <button {...props} className={buttonVariants({ size, checked, className })}>
      {Icon && <Icon className="w-auto h-full" />}
      {!!text && <p>{text}</p>}
    </button>
  );
};

export { ButtonToolBar };
