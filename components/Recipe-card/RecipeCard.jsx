import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import { GiChefToque } from "react-icons/gi";

const RecipeCard = ({ recipe }) => {
  const { title, cookingTime, slug, thumbnail } = recipe.fields;
  return (
    <>
      <div className={styles.card}>
        <div className={styles.featured}>
          <Image
            src={`https:${thumbnail?.fields?.file?.url}`}
            height={350}
            width={550}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.info}>
            <h3>{title}</h3>
            <p>Takes approx {cookingTime} minutes to cook</p>
          </div>
          <div className={styles.actions}>
            <Link href={`/recipes/${slug}`}>
              <a>
                Cook This <GiChefToque />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
