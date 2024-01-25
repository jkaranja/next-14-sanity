import { NextResponse } from "next/server";

//The mutation API lets you create and modify documents. All requests have to be authenticated.
//more here: https://www.sanity.io/docs/http-mutations#40a9a879af9b
//for fetching->but on frontend, use next-sanity with groq language
//endpoint for fetch query: https://zp7mbokg.api.sanity.io/v2021-06-07/data/query/production?query=*[_id == $id]&$id="myId"
//for patch and post nd delete
//returnIds//boolean//(Default false) If true, the id's of modified documents are returned.
//returnDocuments//boolean(Default false) If true, the entire content of changed documents is returned.
//add ?returnIds=true&returnDocuments=true
const endpoint = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.SANITY_DATASET}?returnIds=true`;

export async function POST(request: Request) {
  const { name, email, content, postId } = await request.json();

  try {
    ///delete
    //  {
    //   "mutations": [
    //     {
    //       "delete": {
    //         "id": "123"//or query "query": "*[_type == 'feature' && viewCount < $views]",
    //       "params": {//if using query instead of id
    //       "views": 5
    //         },
    //       }

    //     }
    //   ]
    // }

    //create a comment
    const commentMutations = [
      {
        create: {
          //_id: "123473", //If the _id attribute is missing, then a new, random, unique ID is generated.
          _type: "comment", //type of collection//required
          name,
          email,
          content,
        },
      },
    ];

    //patch
    const postMutations = (commentId: string) => [
      {
        patch: {
          // _type: "post",//Not valid//don't pass this for patch. unknown field error//id is unique across the dataset
          id: postId, //_id in results// //can be a query if not id->where//good to modify multiple docs
          //eg//"query": "*[_type == 'person' && points >= $threshold]",//see params below to pass this variable
          //set performs a shallow merge of its argument into the document.->updates
          // set: {
          //   title: "SEO Basics: How to Do SEO for Beginners - 2024",
          //   //"personalMetrics.height": 201 //for nested fields
          // },
          //"setIfMissing": {doc},//setIfMissing is like set, except existing keys will be preserved and not overwritten.
          //"unset": ["foo", "bar"]//Deletes one or more attributes.
          //insert provides methods for modifying arrays, by inserting, appending and replacing elements
          insert: {
            //for nested object with array field->use user.comments[-1]
            after: "comments[-1]", // append at end: comments[-1],  Insertion b4 index: comments[2], Prepend at start: comments[0], replace: comments[2:]
            items: [
              //doc can be any value the array is defined to have in schema. Here it has a reference
              {
                _type: "reference",
                _ref: commentId, //_id of comment doc
              },
            ],
          },
          // params: {//if using query instead of id eg "*[_type == 'person' && points >= $threshold]",
          //   threshold: 100,
          // },
          // dec: {
          //   points: 100,
          // },
          // inc: {
          //   bonuses: 1,
          // },
        },
      },
    ];

    //create comment
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({ mutations: commentMutations }),
    });
    const comment = await response.json();
     //console.log(comment);
    const commentId = comment?.results?.[0]?.id;
    if (!response.ok || !commentId) {
      return NextResponse.json(
        { message: "Oops! Please try again" },
        {
          status: 400,
        }
      );
    }
    //update post by adding this comment ref using returned id to the comments array
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify({ mutations: postMutations(commentId) }),
    });
    const post = await res.json();
    console.log(post);
    if (!res.ok) {
      return NextResponse.json(
        { message: "Oops! Please try again" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { message: "Comment posted" },
      {
        status: 200,
      }
    );
  } catch (error) {
    //console.log(error);
    return NextResponse.json({ message: "Network error" });
    //network error
  }
}
