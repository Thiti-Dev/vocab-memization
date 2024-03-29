module.exports = {
  extends: ["next", "turbo", "prettier", "next/core-web-vitals"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
    "import/no-anonymous-default-export": "off",
  },
};
