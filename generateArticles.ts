import fs from "fs";
import matter from "gray-matter";
import path from "path";

function extractFrontmatter(content: any) {
  const { data } = matter(content);
  return data;
}

type ArticleData = null | {
  date: string;
  slug: string;
  [key: string]: any;
};

function getAllArticles(): ArticleData[] {
  const articlesDirectory = path.join(
    __dirname,
    "./src/routes/(main)/articles/(article)"
  );
  const articleFolders = fs.readdirSync(articlesDirectory).filter(
    (folder) => fs.statSync(path.join(articlesDirectory, folder)).isDirectory() // Solo carpetas
  );

  const articlesData = articleFolders
    .map((slug) => {
      const filePath = path.join(articlesDirectory, slug, "index.mdx");
      if (!fs.existsSync(filePath)) return null; // Si no existe index.mdx en la carpeta, retornar null

      const fileContents = fs.readFileSync(filePath, "utf8");
      const frontmatter = extractFrontmatter(fileContents);

      return {
        ...frontmatter,
        slug: slug, // Agregando el slug al objeto resultante
      };
    })
    .filter(Boolean) as ArticleData[]; // Filtrar los nulls en caso de que alguna carpeta no tenga index.mdx

  return articlesData.sort((a, z) => {
    if (!a || !z) return 0;
    return (
      (new Date(z!.date) as any as number) -
      (new Date(a!.date) as any as number)
    );
  });
}

function createJsonArticles() {
  const articles = getAllArticles();

  const articlesJson = JSON.stringify(articles, null, 2);

  const articlesJsonPath = path.join(__dirname, "./src/routes/articles.json");

  fs.writeFileSync(articlesJsonPath, articlesJson);
}

// Ejecuta la función para crear el JSON
createJsonArticles();
