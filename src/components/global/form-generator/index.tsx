import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

type Props = {
    type?: 'text' | 'number' | 'email' | 'password';
    inputType: 'select' | 'input' | 'textarea';
    options?: { label: string; value: string, id: string }[]; // For select input
    label?: string;
    placeholder?: string;
    name: string;
    register: UseFormRegister<any>; // Register function from react-hook-form
    errors: FieldErrors<FieldValues>; // Errors from react-hook-form
    required?: boolean; 
    lines?: number; // For textarea input
    defaultValue?: string; // initial value for controlled fields
}

const FormGenerator = ({
    type,
    inputType,
    options,
    label,
    placeholder,
    name,
    register,
    errors,
    required,
    lines = 1,
    defaultValue = ''
}: Props) => {
    switch (inputType) {
        case "input": 
            return (
                <Label
                    className='flex flex-col gap-2 text-[#9d9d9d]'
                    htmlFor={`input-${label}`}                
                >
                    {label && label}
                    <Input 
                        id={`input-${label}`}
                        type={type || 'text'}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...register(name)}
                        className='bg-transparent border-themeGray text-themeTextGray'
                    />
                    <ErrorMessage 
                        errors={errors} 
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-500 text-xs mt-1'>
                                {message === 'Required' ? `${label} is required` : message}
                            </p>
                        )}
                    />
                </Label>
            )

        case "select":
            return (
                <Label
                    className='flex flex-col gap-2 text-[#9d9d9d]'
                    htmlFor={`select-${label}`}                
                >
                    {label && label}
                    <select 
                        id={`select-${label}`}
                        defaultValue={defaultValue}
                        {...register(name)}
                        className='w-full bg-transparent border-[1px] p-3 rounded-lg'
                    >
                        {options?.map((option) => (
                            <option 
                                key={option.id}
                                value={option.value}
                                className='dark:bg-muted'
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ErrorMessage 
                        errors={errors} 
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-500 text-xs mt-1'>
                                {message === 'Required' ? `${label} is required` : message}
                            </p>
                        )}
                    />
                </Label>
            )

        case "textarea":
            return (
                <Label
                    className='flex flex-col gap-2 text-[#9d9d9d]'
                    htmlFor={`textarea-${label}`}                
                >
                    {label && label}
                    <textarea 
                        id={`textarea-${label}`}
                        placeholder={placeholder}
                        defaultValue={defaultValue}
                        {...register(name)}
                        rows={lines}
                        className='bg-transparent border-themeGray text-themeTextGray'
                    />
                    <ErrorMessage 
                        errors={errors} 
                        name={name}
                        render={({ message }) => (
                            <p className='text-red-500 text-xs mt-1'>
                                {message === 'Required' ? `${label} is required` : message}
                            </p>
                        )}
                    />
                </Label>
            )
        default:
            return null;
    }
}

export default FormGenerator
