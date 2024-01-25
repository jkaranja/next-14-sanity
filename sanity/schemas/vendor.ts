import { defineField, defineType } from "sanity";

export default defineType({
  name: "vendor",
  title: "Vendor",
  type: "document",
  fields: [
    defineField({
      name: "vendor",
      title: "Vendor",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "vendor",
        maxLength: 96,
      },
    }),
    // defineField({
    //   name: "mainImage",
    //   title: "Main image",
    //   type: "image",
    //   options: {
    //     hotspot: true,
    //   },
    //   fields: [
    //     {
    //       name: "alt",
    //       type: "string",
    //       title: "Alternative Text",
    //     },
    //   ],
    // }),
    // defineField({
    //   name: "description",
    //   title: "Description",
    //   type: "text",
    //   //more on validation https://www.sanity.io/docs/validation
    //   validation: (Rule) => Rule.required().min(10).max(480),
    // }),
  ],
});
