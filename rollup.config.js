import typescript from "rollup-plugin-typescript2";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: "dist/index.umd.js",
      format: "umd",
      name: "ReactGoogleCharts"
    },
    {
      file: "dist/index.esm.js",
      format: "esm"
    },
    {
      file: "dist/index.cjs.js",
      format: "cjs"
    }
  ],
  external: ["react-load-script", "react"],
  plugins: [
    typescript({
      typescript: require("typescript"),
      abortOnError: false
    })
  ]
};
