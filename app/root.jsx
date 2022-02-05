import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "./styles/app.css";

export function meta() {
  const title = "Gaëtan Kueny";
  const author = "@gkueny";
  const description = "Développeur depuis maintenant 6 ans, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur du Symfony / php.";
  return { 
    title,
    description,
    author,
    "og:title": title,
    "og:description": description,
    "og:type": "website",
    "twitter:card": "summary",
    "twitter:creator": author,
    "twitter:title": title,
    "twitter:description": description,
  };
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function App() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "production" && (
          <script async src="https://cdn.splitbee.io/sb.js"></script>
        )}
        {/* {process.env.NODE_ENV === "development" && <LiveReload />} */}
      </body>
    </html>
  );
}
