type postsProps = {
  label: string;
  type: string;
  placeholder: string;
};

export const postsData: postsProps[] = [
  {
    label: "Title",
    type: "text",
    placeholder: "Enter your title",
  },
  {
    label: "Content",
    type: "text",
    placeholder: "Enter your content",
  },
  {
    label: "Cover Image",
    type: "text",
    placeholder: "",
  },
  {
    label: "Tags",
    type: "text",
    placeholder: "Enter your tags",
  },
];