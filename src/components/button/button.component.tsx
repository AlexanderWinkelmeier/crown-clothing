import { FC, ButtonHTMLAttributes } from 'react';

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
  LoadingSpinner,
} from './button.styles';

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted',
}

// Eine Hilfs-Funktion, der man den ButtonType übergibt und dann EINEN der drei ButtonComponents (Button-Styles) zurückerhält

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base): typeof BaseButton =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

// ({declares object properties}[propertyToAccess])
// es werden bei getButton die properties eines Objekts, das sich in den geschweiften Klammern befindet, deklariert
// darunter in eckigen Klammern steht unter welcher Bezeichnung diese Properties im Objekt erreichbar sein sollen
// hier unter buttonType
// übergibt man der Funktion z.B. BUTTON_TYPE_CLASSES.google erhält man den GoogleSignInButton zurück

export type ButtonProps = {
  buttonType?: BUTTON_TYPE_CLASSES;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  isLoading = false,
  ...otherProps
}) => {
  const CustomButton = getButton(buttonType);
  return (
    <CustomButton disabled={isLoading} {...otherProps}>
      {isLoading ? <LoadingSpinner /> : children}
    </CustomButton>
  );
};

export default Button;
