import { defineField, defineType } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "vendor",
      title: "Vendor",
      type: "reference",
      to: { type: "vendor" },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: { type: "prodCategory" },
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "discountedPrice",
      title: "Discounted Price",
      type: "number",
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "number",
      initialValue: 200,
    }),
    defineField({
      name: "weight",
      title: "Weight",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "grams", type: "string", title: "Grams" },
            { name: "extra", type: "number", title: "Extra amount" },
          ],
        },
      ],
    }),
    defineField({
      name: "sold",
      title: "Sold",
      type: "number",
      initialValue: 105,
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 5,
    }),
    defineField({
      name: "totalReviews",
      title: "Total Reviews",
      type: "number",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [{ type: "reference", to: { type: "review" } }],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    }),
    defineField({
      name: "productImages",
      title: "Product images",
      type: "array",
      of: [
        {
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
        },
      ],
    }),
  ],
});
