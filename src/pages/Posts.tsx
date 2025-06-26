import { FormInput } from '@/components/FormInput'
import { postsData } from '@/constants/posts_data'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PostsData, PostsSchema } from '@/utils/validation'
import React, { useState } from 'react'
import { postPosts } from '@/api/posts'

export const Posts = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<PostsData>({
    resolver: zodResolver(PostsSchema),
    defaultValues: {
      title: "",
      content: "",
      coverimage: "",
      tags: []
    }
  })

  const onSubmit: SubmitHandler<PostsData> = async (data) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Form submitted successfully:", data);
      
      const response = await postPosts({
        payload: data
      });
      console.log("Response from API:", response);
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      // Handle error appropriately, e.g., show a notification
      setError("Error: An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
    {postsData.map((data, i) => {
      const fieldName = data.label.toLowerCase() as keyof PostsData;
      return (
        <FormInput key={i} label={data.label} error={errors[fieldName]?.message} >
          <input 
            {...register(fieldName)}
            placeholder={data.placeholder}
            type={data.type}
            className={`w-full py-2.5 px-4 border ${errors[fieldName] ? "border-red-500" : "border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </FormInput>
      )
    })}
    <button type="submit" className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-weight-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {loading ? "Submitting..." : "Finish"}
    </button>
    </form>
  )
}
