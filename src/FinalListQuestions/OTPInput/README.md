# OTP Input Component

A React component for One-Time Password (OTP) input with auto-focus, backspace navigation, and paste support.

## Features

- ✅ **Auto-focus**: Automatically moves to next input when digit is entered
- ✅ **Backspace navigation**: Goes back to previous input on backspace
- ✅ **Paste support**: Allows pasting entire OTP at once
- ✅ **Input validation**: Only accepts numeric digits (0-9)
- ✅ **Accessible**: Includes proper ARIA labels
- ✅ **Customizable**: Adjustable length and styling

## Usage

### Basic Usage
```jsx
import OTPInput from './OTPInput';

function App() {
  return (
    <div>
      <OTPInput length={4} />
    </div>
  );
}
```

### With Custom Length
```jsx
<OTPInput length={6} /> // For 6-digit OTP
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `4` | Number of OTP digits |

## How It Works

### 1. State Management
- `otp`: Array storing each digit separately
- `inputRefs`: References to each input element for focus control

### 2. Input Handling
- **handleInputChange**: Validates input and auto-focuses next field
- **handleKeyDown**: Handles backspace navigation
- **handlePaste**: Processes pasted OTP strings

### 3. Focus Management
- Auto-focuses next input when digit is entered
- Moves to previous input on backspace when current is empty
- Focuses appropriate input after paste

## User Experience

### Keyboard Navigation
- Type digits normally - auto-advances to next input
- Press Backspace to go back to previous input
- Tab/Shift+Tab works for accessibility

### Paste Support
- Copy an OTP (e.g., "1234") and paste anywhere in the inputs
- Only numeric digits are extracted from pasted text
- Automatically fills inputs and focuses next empty field

## CSS Classes

### Container
- `.otp-container`: Flex container for all inputs

### Input Fields
- `.otp-input`: Individual input styling
- `.otp-input:focus`: Focus state with blue border
- `.otp-input:disabled`: Disabled state styling

## Customization

### Styling
Modify `OTPInput.css` to change appearance:
- Input size: Change `width` and `height`
- Colors: Modify `border-color` and `box-shadow`
- Spacing: Adjust `gap` in container

### Validation
The component uses regex `/^[0-9]?$/` to validate input. To allow letters:
```jsx
// Change this line in handleInputChange
if (!/^[a-zA-Z0-9]?$/.test(value)) return; // Allows letters and numbers
```

## Example Implementation

```jsx
import React, { useState } from 'react';
import OTPInput from './OTPInput';

function LoginForm() {
  const [otp, setOtp] = useState('');
  
  const handleVerify = () => {
    // Get OTP value and verify
    console.log('OTP entered:', otp);
    // Send to API for verification
  };
  
  return (
    <div>
      <h2>Enter OTP</h2>
      <OTPInput length={6} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
```

## File Structure

```
OTPInput/
├── OTPInput.jsx       # Main component
├── OTPInput.css       # Styling
├── OTPDemo.jsx        # Demo/example usage
└── README.md          # This documentation
```

## Tips for Future Development

1. **Getting OTP Value**: The component stores OTP internally. To access it, you can:
   - Pass an `onChange` prop to get value on each change
   - Use `useImperativeHandle` to expose methods to parent
   - Store value in parent component state

2. **Validation**: Add your own validation logic in parent component

3. **Error States**: Add error styling by passing error prop and updating CSS

4. **Auto-submit**: Add auto-submit when all fields are filled

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Supports clipboard API for paste functionality
- Accessible with screen readers 