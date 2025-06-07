import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormInput } from './FormInput';
import { signInForm_data } from '@/constants/signInForm_data';
import { SignInFormData, UserSchema } from '@/utils/validation';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { postLogin } from '@/api/login';
import { login, setUser } from '@/redux/slices/authSlice';

export const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register, 
    handleSubmit, 
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const onSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await postLogin({
        payload: { email, password }
      });

      dispatch(login(response));
      setUser(response);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");

    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    {signInForm_data.map((data, i) => (
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
        {loading ? "Signing In..." : "Sign In"}
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}