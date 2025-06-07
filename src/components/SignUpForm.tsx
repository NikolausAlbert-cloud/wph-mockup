
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './FormInput';
import { signUpForm_data } from '@/constants/signUpForm_data';
import { SignUpFormData, UserSchema } from '@/utils/validation';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postRegister } from '@/api/register';
import { setUser } from '@/redux/slices/authSlice';

export const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmpassword: ''
    }
  });
  const onSubmit = (data: SignUpFormData, e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await postRegister({
        payload: { name, email, password, confirmpassword }
      });

      dispatch(setUser(response));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    
    } catch (err) {
      console.error("Registration error:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {signUpForm_data.map((data, i) => (
      <FormInput key={i} label={data.label} error={errors[data.label.toLowerCase()]?.message}>
        <input 
        {...register(data.label.toLowerCase())} 
        value={data.label.toLowerCase()}
        onChange={e => `set${data.label.charAt(0).toUpperCase() + data.label.slice(1)}`(e.target.value)}
        placeholder={data.placeholder} 
        type={data.type}
        className={`w-full py-2.5 px-4 border ${errors[data.label.toLowerCase()]?"border-red-500":"border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`} />
      </FormInput>
    ))}

      <button type="submit" className="w-full bg-primary-300 text-sm font-semibold text-neutral-25 py-2.5 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {loading ? "Loading..." : "Sign Up"}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </button>
    </form>
  )
}