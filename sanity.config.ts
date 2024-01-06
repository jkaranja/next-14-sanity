/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...index]]\page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./sanity/env";
import  schema  from "./sanity/schema";
import { myTheme } from "./sanity/theme";
import MyEnhancedNavbar from "@/app/components/MyEnhancedNavbar";

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "welia tech blog",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
    deskTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  //customize embedded sanity studio
  //https://www.sanity.io/docs/component-api
  //you customize the navbar, icons, form inputs
  studio: {
    components: {
      //logo: <Logo />//component-> //React.JSX.Element | React.ReactNode//logo is deprecated
      //navbar: <StudioNavbar />//React.JSX.Element | React.ReactNode
      // layout: MyLayout,
      // logo: MyLogo,
      navbar: MyEnhancedNavbar,
      // toolMenu: MyToolMenu,
    },
  },
  theme: myTheme, //add custom theme//add custom theme here
});
