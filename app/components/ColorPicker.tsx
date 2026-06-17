'use client';
import { useState } from "react";

// ----------------------------------------------------------------------

interface ColorPickerProps {
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
  required?: boolean;
  className?: string;
  colorCurrent?: string;
}

const ColorPicker = ({ 
  label = "Couleur", 
  value = "", 
  onChange,
  required = false,
  className = "",
  colorCurrent ,
}: ColorPickerProps) => {
  const [color, setColor] = useState(value ? value : colorCurrent);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange?.(newColor);
  };

  return (
    <div className={className}>
      <p className="pb-1">
        {label}{required && '(*)'}
      </p>
      <label className="hover:border-primary-600 dark:hover:border-primary-500 group relative inline-flex size-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300 transition-colors dark:border-dark-450">
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        <div 
          className="size-14 rounded-md border-2 border-white shadow-sm dark:border-gray-700"
          style={{ backgroundColor: color }}
        />
      </label>
      <p className="mt-1 text-xs text-gray-500 dark:text-dark-450">{color}</p>
    </div>
  );
};

export { ColorPicker };
