import { render, fireEvent } from '@testing-library/react';

import Button from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Button onClick={() => console.log('I am a button.')} text="Buton" />
    );
    expect(baseElement).toBeTruthy();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button text="Click me" onClick={handleClick} />
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
