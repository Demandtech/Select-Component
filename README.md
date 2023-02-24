# Select Component Documentation

This React component implements a customizable select input that can be used for single or multiple selections.

# Usage
To use the component, simply import it and pass it the necessary props:

```js
import { Select, SelectOptions } from './Select';

const options: SelectOptions[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
];

function MyComponent() {
  const [value, setValue] = useState<SelectOptions>({ label: '', value: '' });

  const handleOnChange = (option: SelectOptions | undefined) => {
    setValue(option || { label: '', value: '' });
  };

  return (
    <Select
      options={options}
      value={value}
      onChange={handleOnChange}
    />
  );
}
```
The Select component takes the following props:

- options (required): an array of objects representing the available options in the select input. Each option must have a label and a value.

- multiple (optional): a boolean indicating whether the select input should allow multiple selections. If true, the value prop should be an array of SelectOptions.

- value (optional): an object or an array of objects representing the currently selected option(s) in the select input.

- onChange (required): a callback function that will be called whenever the selected option(s) change. The function will receive the new selected option(s) as a parameter.


- clearOptions(): A function that clears the selection.

# Customization

The component comes with a default styling, but you can customize it by overriding the CSS classes defined in the select.module.css file.

# Keyboard Navigation

The component supports keyboard navigation for accessibility. You can use the arrow keys to move up and down the options list, and the enter or space key to select an option. You can also use the escape key to close the options list.