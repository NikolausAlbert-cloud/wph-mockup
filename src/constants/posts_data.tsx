type postsProps = {
  label: string;
  type: "text" | "quill";
  placeholder: string;
  fieldName: string;
};

export const postsData: postsProps[] = [
  {
    label: "Title",
    type: "text",
    placeholder: "Enter your title",
    fieldName: "title",
  },
  {
    label: "Content",
    type: "quill",
    placeholder: "Enter your content",
    fieldName: "content",
  },
  {
    label: "Cover Image",
    type: "text",
    placeholder: "",
    fieldName: "coverimage",
  },
  {
    label: "Tags",
    type: "text",
    placeholder: "Enter your tags (comma-separated)",
    fieldName: "tags",
  },
];