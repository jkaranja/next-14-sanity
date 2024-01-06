import {defineField, defineType} from 'sanity'

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      //more on validation https://www.sanity.io/docs/validation
      validation: (Rule) => Rule.required().min(10).max(80),
    }),
  ],
});
