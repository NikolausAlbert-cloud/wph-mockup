import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; 

type QuillComponentProps = {
  value: string;
  onChange: (value: string) => void;
};

export function QuillComponent({value, onChange}: QuillComponentProps) {
  
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          ['clean']
        ]
      }}
      formats={[
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'link',
        'image'
      ]}
      placeholder="Write something amazing..."
      className="h-64 border border-neutral-300 rounded-xl text-sm font-weight-regular focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  )
}