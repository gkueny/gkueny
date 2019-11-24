import React from "react";
import Article from "./Article";
import { Link } from "gatsby";

const ArticlesList = () => {
  return (
    <ul className="flex flex-col h-full justify-around py-24">
      <li className="my-4">
        <Article
          title="Protéger son application"
          description="Lorsque l’on code une application React, on est vite amené à protéger l’accès à une partie de celle-ci. Je vais vous montrer ici ma technique préférée afin de filtrer l'accès à certains composants."
          categories={[{ title: "react" }, { title: "security" }]}
        />
      </li>
      <li className="my-4">
        <Article
          title="Utiliser Firebase avec React"
          description="Avec React, vous savez persister les données de l’utilisateur, mais une nouvelle question se pose. Comment en partager une partie avec les autres utilisateurs? Dans le cadre d’un tchat par exemple?"
          categories={[{ title: "react" }, { title: "firebase" }]}
        />
      </li>
      <li className="my-4">
        <Article
          title="Feuille de route d'une application React"
          description="Lorsque j’ai commencé à coder une application React, j’ai passé un petit bout de temps à googler “React c’est quoi ?”, “Quelle librairie utiliser pour le routing ?” etc… C’est pourquoi je vous livre ici, une petite feuille de route pour réaliser votre première application React sans vous perdre dans les méandres de google :)."
          categories={[{ title: "react" }]}
        />
      </li>
      <li className="my-4 w-14">
        <Link
          to="/blog"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-between"
        >
          <span> Voir tous mes articles</span>
          <svg
            className="fill-current h-6 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
          >
            <path d="M16,4.96C9.913,4.96,4.96,9.912,4.96,16S9.913,27.04,16,27.04S27.04,22.088,27.04,16S22.087,4.96,16,4.96z M16,25.12  c-5.028,0-9.12-4.092-9.12-9.12S10.972,6.88,16,6.88s9.12,4.092,9.12,9.12S21.028,25.12,16,25.12z" />
            <polygon points="13.098,11.368 17.966,16 13.098,20.632 14.421,22.022 20.753,16 14.421,9.977 " />
          </svg>
        </Link>
      </li>
    </ul>
  );
};

export default ArticlesList;
