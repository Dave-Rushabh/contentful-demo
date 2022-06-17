import { createClient } from "contentful";
import RecipeCard from "../../components/Recipe-card/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "recipe",
  });

  return {
    props: {
      recipes: res.items,
    },
  };
};

export default function Recipes({ recipes }) {
  return (
    <>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <>
            <div>
              <RecipeCard recipe={recipe} key={recipe.sys.id} />
            </div>
          </>
        ))}
      </div>
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </>
  );
}
