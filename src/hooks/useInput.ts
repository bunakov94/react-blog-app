import { ChangeEvent, useState } from 'react';

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return {
    value,
    onChange,
  };
}
