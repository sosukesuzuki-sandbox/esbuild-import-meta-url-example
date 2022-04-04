import { build } from "esbuild";
import path from "path";

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["./src/index.js"],
  minify: true,
  bundle: true,
  outfile: "./dist/index.js",
  target: "node14.11",
  platform: "node",
  format: "cjs",
  define: {
    "import.meta.url": "import_meta_url",
  },
  inject: [
    path.join(process.cwd(), "scripts", "injects", "import-meta-url.js"),
  ],
};

if (process.env.WATCH === "true") {
  options.watch = {
    onRebuild(error, result) {
      if (error) {
        console.error("watch build failed:", error);
      } else {
        console.log("watch build succeeded:", result);
      }
    },
  };
}

build(options).catch((err) => {
  process.stderr.write(err.stderr);
  process.exit(1);
});
