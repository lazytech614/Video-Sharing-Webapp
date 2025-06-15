import { UseMutateFunction } from '@tanstack/react-query';
import z, { ZodSchema } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const useZodForm = (
    schema: ZodSchema,
    mutation: UseMutateFunction,
    defaultValues?: any
) => {
  const {
    register, 
    handleSubmit, 
    watch, 
    reset, 
    formState: {errors}
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {...defaultValues},
  });

  const onFormSubmit = handleSubmit(async (values) => mutation({...values}))

  return {
    register, 
    watch, 
    reset, 
    errors,
    onFormSubmit,
    handleSubmit
  }
}