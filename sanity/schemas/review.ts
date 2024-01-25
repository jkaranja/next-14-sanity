import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      //more on validation https://www.sanity.io/docs/validation
      //validation: (Rule) => Rule.required().min(10).max(80),
    }),
  ],
});
