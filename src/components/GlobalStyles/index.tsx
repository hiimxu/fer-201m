import React from 'react';
import './GlobalStyles.scss';

type Props = {
    children: JSX.Element;
};

export default function GlobalStyles({ children }: Props) {
    return React.Children.only(children);
}
