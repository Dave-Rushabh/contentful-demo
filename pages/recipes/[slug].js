import { createClient } from "contentful";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: "recipe",
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await client.getEntries({
    content_type: "recipe",
    "fields.slug": params.slug,
  });

  const data = res.items;

  return {
    props: {
      recipe: data[0],
    },
  };
};

export default function RecipeDetails({ recipe }) {
  const { title, featuredImage, cookingTime, ingredients, method } =
    recipe.fields;
  return (
    <>
      <div className="banner">
        <Image
          src={`https:${featuredImage.fields.file.url}`}
          height={400}
          width={1200}
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <p> Takes about {cookingTime} minutes to cook</p>
        <h3>Ingredients : </h3>
        {ingredients.map((item) => (
          <>
            <span key={item}>{item}</span>
          </>
        ))}
      </div>
      <div className="method">
        <h3>Method :</h3>
        <div>{documentToReactComponents(method)}</div>
      </div>
    </>
  );
}
