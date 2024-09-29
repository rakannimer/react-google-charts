import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the structure of the frontmatter (optional, for stronger typing)
interface FrontMatter {
  [key: string]: any;
}

// Define the structure of the file and its frontmatter
interface MarkdownFileData {
  filePath: string;
  fileName: string;
  url: string;
  frontMatter: FrontMatter;
}

/**
 * Generate the URL for the markdown file based on its path.
 * @param relativeFilePath - The relative path to the file from the project root.
 * @param baseUrl - The base URL path (typically `/docs`).
 * @returns The calculated URL for the file.
 */
function generateDocusaurusUrl(
  relativeFilePath: string,
  baseUrl: string,
): string {
  // Remove the extension (.md or .mdx)
  const urlPath = relativeFilePath
    .replace("docs/", "") // Remove the "docs/" prefix
    .replace(/\\/g, "/") // Normalize Windows paths to use forward slashes
    .replace(/\.mdx?$/, ""); // Remove the .md or .mdx extension

  // Combine the base URL with the relative path to generate the final URL
  return `${baseUrl}/${urlPath}`;
}

/**
 * Read all Markdown or MDX files in a directory, extract the frontmatter, and return it as JSON.
 * @param folderPath - The relative path to the folder containing the markdown files.
 * @param baseUrl - The base URL path for the Docusaurus docs section (e.g., `/docs`).
 * @returns Array of objects containing file paths, file names, URLs, and their frontmatter as JSON.
 */
function getMarkdownFrontmatter(
  folderPath: string,
  baseUrl: string,
): MarkdownFileData[] {
  // Get the project root directory (the directory where the script is being run from)
  const projectRoot = process.cwd();

  // Resolve the absolute path from the relative folder path
  const absoluteFolderPath = path.resolve(folderPath);

  // Check if the directory exists
  if (!fs.existsSync(absoluteFolderPath)) {
    throw new Error(`Directory ${absoluteFolderPath} does not exist.`);
  }

  // Get all files in the directory
  const files = fs.readdirSync(absoluteFolderPath);

  // Filter out non-markdown/mdx files and parse frontmatter for each file
  const markdownFiles: MarkdownFileData[] = files
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx")) // Filter for only .md or .mdx files
    .map((file) => {
      const filePath = path.join(absoluteFolderPath, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontMatter } = matter(fileContent); // Extract the frontmatter using gray-matter

      // Get the relative file path (relative to the project root)
      const relativeFilePath = path.relative(projectRoot, filePath);

      // Generate the Docusaurus URL for this file
      const url = generateDocusaurusUrl(relativeFilePath, baseUrl);

      // Return the filePath, fileName, URL, and frontMatter
      return {
        filePath: relativeFilePath, // Return the relative path to the file
        fileName: path.basename(file), // Extract the file name from the path
        url: url, // Generate the URL for the file
        frontMatter: frontMatter as FrontMatter, // Return the frontmatter as JSON
      };
    });

  return markdownFiles;
}

/**
 * Write the extracted frontmatter and URLs to a `docs.js` file in the folder.
 * @param folderPath - The relative path to the folder where the `docs.js` will be written.
 * @param markdownData - The array of markdown file data containing file paths, file names, URLs, and frontmatter.
 */
function writeBarrelToFile(
  folderPath: string,
  markdownData: MarkdownFileData[],
): void {
  const absoluteFolderPath = path.resolve(folderPath);

  // Prepare the JS content as a string
  const jsContent = `export const docs = ${JSON.stringify(markdownData, null, 2)};\n`;

  // Write the content to a `docs.js` file in the folder
  const outputFilePath = path.join(absoluteFolderPath, "docs.ts");
  fs.writeFileSync(outputFilePath, jsContent, "utf-8");
  console.log(`Wrote frontmatter JSON to ${outputFilePath}`);
}

/**
 * Process a list of folders, extract frontmatter from Markdown/MDX files, and write each barrel JSON as `docs.js`.
 * @param folderPaths - An array of relative paths to folders containing markdown files.
 * @param baseUrl - The base URL for the Docusaurus docs section (e.g., `/`).
 */
function barrelFolders(folderPaths: string[], baseUrl: string): void {
  folderPaths.forEach((folderPath) => {
    try {
      const frontmatterData = getMarkdownFrontmatter(folderPath, baseUrl);
      writeBarrelToFile(folderPath, frontmatterData);
    } catch (error) {
      console.error(`Error processing folder ${folderPath}: ${error.message}`);
    }
  });
}

const main = () => {
  const folders = ["./docs", "./docs/examples"];

  barrelFolders(folders, "");
};
main();
