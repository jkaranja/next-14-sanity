import { defineField, defineType } from "sanity";

export default defineType({
  name: "prodCategory",
  title: "Product Category",
  type: "document",
  fields: [
    defineField({
      name: "parent",
      title: "Parent",
      type: "reference",
      weak: true, //default: false//This allows references to point at documents that may or may not exist, such as a document that has not yet been published or a document that has been deleted (or indeed an entirely imagined document).
      to: { type: "prodCategory" },//self reference
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      //more on validation https://www.sanity.io/docs/validation
      // validation: (Rule) => Rule.required().min(10).max(480),
    }),
  ],
});
