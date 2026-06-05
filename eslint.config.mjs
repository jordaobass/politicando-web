import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import security from "eslint-plugin-security";
import noSecrets from "eslint-plugin-no-secrets";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Lint de segurança: detecta padrões perigosos (eval, regex inseguro, child_process,
  // buffer/timing não confiável, etc.) via eslint-plugin-security.
  security.configs.recommended,
  {
    rules: {
      // Ruidosa demais: marca todo acesso obj[chave], inclusive em objetos/arrays
      // tipados (TS já previne o risco). Mantemos as demais regras do plugin.
      "security/detect-object-injection": "off",
    },
  },
  // Detecção de segredos hardcoded (tokens/chaves de alta entropia) no código-fonte.
  {
    files: ["src/**/*.{js,mjs,ts,tsx}"],
    plugins: { "no-secrets": noSecrets },
    rules: {
      "no-secrets/no-secrets": ["error", { tolerance: 4.2 }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
