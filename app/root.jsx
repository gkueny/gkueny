import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import styles from "./styles/app.css?url";
import { Analytics } from "@vercel/analytics/react";

export function meta() {
  const title = "Gaëtan Kueny";
  const author = "@gkueny";
  const description =
    "Développeur depuis maintenant 8 ans et à mon compte depuis 3 ans, j'ai une grande affinité avec le front-end et les tests bien fait. Pas full-stack mais touche à tout, je suis également à l'aise sur le développement mobile avec react-native et le développement backend Symfony / php.";
  return [
    {
      title,
    },
    { name: "description", content: description },
    { name: "author", content: author },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "twitter:card",
      content: "summary",
    },
    {
      property: "twitter:creator",
      content: author,
    },
    {
      property: "twitter:title",
      content: title,
    },
    {
      property: "twitter:description",
      content: description,
    },
  ];
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
        <Analytics />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "production" && (
          <script async src="https://cdn.splitbee.io/sb.js"></script>
        )}
      </body>
    </html>
  );
}
