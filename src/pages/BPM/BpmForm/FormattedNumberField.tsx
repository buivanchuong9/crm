import React, { useState, useEffect } from 'react';

// Hàm format: 1234567 -> 1.234.567
function formatNumberWithDots(value) {
  if (value == null || value === '') return '';
  const num = Number(value.toString().replace(/\D/g, ''));
  if (isNaN(num)) return '';
  return new Intl.NumberFormat('vi-VN').format(num);
}

export default function FormattedNumberField({ field, value = '', disabled, onChange }) {
  const [inputValue, setInputValue] = useState('');
    console.log('inputValue', inputValue);
    
  useEffect(() => {
    setInputValue(formatNumberWithDots(value));
  }, [value]);

  const handleChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const number = raw ? Number(raw) : undefined;

    setInputValue(formatNumberWithDots(raw));
    onChange(number); // Cập nhật data thực sự trong form
  };

  return (
    <div className="fjs-form-field">
      {field.label && <label className="fjs-label">{field.label}</label>}
      <input
        type="text"
        className="fjs-input"
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        // inputMode="numeric"
        placeholder={field.placeholder || ''}
      />
    </div>
  );
}
