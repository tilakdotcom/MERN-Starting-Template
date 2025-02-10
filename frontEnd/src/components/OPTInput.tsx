import { useRef, useState } from 'react';

// declare type for the props
type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OTPInput = ({ length = 4, onComplete }: InputProps) => {
  const inputRef = useRef<HTMLInputElement[]>(Array(length));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  return (
    <div className={`sm:grid flex flex-wrap ${"grid-cols-"+length} gap-3 `}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
          className={`border border-solid border-green-500 focus:border-green-700 p-2 rounded-md text-center text-green-700 bg-green-100 focus:bg-white outline-none transition duration-300 ease-in-out w-10 `}
        />
      ))}
    </div>
  );
};

export default OTPInput;
