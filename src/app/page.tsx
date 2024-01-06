import React from "react";
import { client } from "../../sanity/lib/client";

import { Post } from "./types/post";
import { urlForImage } from "../../sanity/lib/image";
import Image from "next/image";
import { groq } from "next-sanity";
import ClientSideRoute from "./components/ClientSideRoute";

//use groq and install sanity.io vscode extension for syntax highlighting
// Step 1: write a query
// const query = groq`
//   *[_type == 'blogPost'] {
//     // pick the title
//     title,
//     // then a full expansion of the author
//     author -> { ... },
//   }
// `;

//const query = `*[_type == "post"]`;//will return all fields
//*[_type == 'movie' && releaseYear >= 1979]
//#Projections->select only fields we want. Passed inside {}
//Tip: use {..., author->} //the ... selects all fields/can add fields that need custom format like reference/same like in graphql
//#sorting: use | and order function=> | order(releaseYear desc, title, ...) accepts a list of fields(optional direction->default is asc)
//#Slicing the result set//add it at the end or after type array: works exactly like an array accessor
//[0]  return only the first element.i.e like array bracket notation to access items
//or If we want a slice, we can add the range operator like this: [0...100]. //works like slice method
//i.e This would return the first hundred movies from index 0 through 99.
//#References and joins->Expanding references/fetching referenced doc:
//director-> or director->{name} for projection
//By adding the dereferencing operator -> we ask Sanity to follow the reference and replace it with the actual content of the document referenced
//use producers[] for array fields
//To expand references in an array, we will use the dereferencing operator (->) again.
//producers[]-> or with projection producers[]->{name,...}
//#filter=>goes inside th type array: [_type == 'movie' && releaseYear >= 1979]
//Examples: [_type == 'movie' && filtersBelow:
//Text search using the match operator, e.g. *[title match "Alien*"]
//The in-operator which matches values in arrays, as in *["sci-fi" in genres]
//You can of course combine these filters using the boolean operators:
// && (and), || (or), ! (not), like this:
// *[_type == "movie" && (!("sci-fi" in genres) || releaseYear >= 1979)]
//#passing variables: use $lastId
//and pass {lastId} as second arg to fetch(`query`, {lastId})

//NOTE: slicing should come after order else it won't work
//Otherwise, order can be:
//1.  order | slicing | projection
//2.  order | projection | Slicing
//3.  projection | order  | Slicing
const queryx = `*[_type == "post"] | order(releaseYear desc, title, ...) {  
  _id, title, releaseYear, director->{name}
}[0...20]`;

const query = groq`
*[_type == "post"]  {
  ...,
categories[]->,
author->
  } | order(_createdAt desc) [0...20]
  `;

const Blog = async () => {
  const posts = await client.fetch<Post[]>(query);

 

  return (
    <div>
      <div>
        <hr className="border-[#F7AB8A] mb-10" />
      </div>
      {/* Posts */}

      {posts.map((post) => (
        <ClientSideRoute key={post._id} route={`/post/${post.slug?.current}`}>
          <div className="flex flex-col group cursor-pointer">
            <div
              className="relative w-full h-80 drop-shadow-xl group-hover:scale-185 transition-transform duration-200
ease-out"
            >
              <Image
                className="object-cover object-left lg:object-center"
                src={urlForImage(post.mainImage)}
                alt={post.author.name}
                fill
              />
            </div>
          </div>
        </ClientSideRoute>
      ))}
    </div>
  );
};

export default Blog;
