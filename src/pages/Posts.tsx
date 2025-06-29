import { FormInput } from '@/components/FormInput'
import { postsData } from '@/constants/posts_data'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PostsData, PostsSchema } from '@/utils/validation'
import { useState } from 'react'
import { postPosts } from '@/api/posts'
import { QuillComponent } from '@/components/Posts/Quill'

export const Posts = () => {
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
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
      
      const payloadData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : []
      };
      console.log("Form submitted successfully:", payloadData);
      
      const response = await postPosts({
        payload: payloadData,
      });
      console.log("Response from API:", response);
      reset();
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Error: An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-30">
    {error && <p className="text-red-500 text-xs mb-4">{error}</p>}
    {postsData.map((data, i) => {
      {console.log(data)}
      if (data.type == "quill") {
        return (
          <div key={i} className="mb-4">
            <FormInput label={data.label} error={errors.content?.message} >
              <Controller 
                name="content"
                control={control}
                render={({ field }) => (
                  <QuillComponent
                    value={field.value as string}
                    onChange={field.onChange}
                  />
                )}
              />
            </FormInput>
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>
        );
      } else {
        return (
          <FormInput key={i} label={data.label} error={errors[data.fieldName]?.message} >
            <input 
              {...register(data.fieldName)}
              placeholder={data.placeholder}
              type={data.type}
              className={`w-full py-2.5 px-4 border ${errors[data.fieldName] ? "border-red-500" : "border-neutral-300"} rounded-xl text-neutral-950 text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </FormInput>
        );
      }
    })} 
    <button 
      type="submit" 
      disabled={loading}
      className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-xl text-sm font-weight-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {loading ? "Submitting..." : "Finish"}
    </button>
  </form>
  )
};
