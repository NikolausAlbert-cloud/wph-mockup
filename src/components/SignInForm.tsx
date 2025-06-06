import React from 'react'
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { signInForm_data } from '@/constants/signInForm_data';

type SignInFormProps = {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const {register, handleSubmit, formState: { errors }} = useForm<SignInFormProps>();
  const onSubmit = (data: SignInFormProps) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {signInForm_data.map((data, i) => (
      <FormInput key={i} label={data.label} error={errors[data.label.toLowerCase()]?.message}>
        <input 
        {...register(data.label.toLowerCase(), {required: {value:true, message:`${data.label} is required`}})} 
        placeholder={data.placeholder} 
        type={data.type}
        className={`w-full py-2.5 px-4 border ${errors[data.label.toLowerCase()]?"border-red-500":"border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`} />
      </FormInput>
    ))}

      <button type="submit" className="w-full bg-primary-300 text-sm font-semibold text-neutral-25 py-2.5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Sign In
      </button>
    </form>
  )
}