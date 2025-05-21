# 🔧 Secret Lib

A personal lightweight library for React, focused on filling the gaps left by other libraries.

[![npm version](https://badgen.net/npm/v/secret-lib)](https://www.npmjs.com/package/secret-lib)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/secret-lib)](https://bundlephobia.com/package/secret-lib)
[![license](https://badgen.net/npm/license/secret-lib)](https://github.com/matheusboeira/secret-lib/blob/main/LICENSE)

---

## Pre Requirements

- [TailwindCSS](https://tailwindcss.com/) ~ 3.4
- [React](https://reactjs.org/) >= 18
- [clsx](https://github.com/lukeed/clsx) >= 2.0
- [tailwind-merge*](https://github.com/dcastil/tailwind-merge) >= 3.2

It uses the `cn` utility function, which relies on `clsx` and `tailwind-merge`. This pattern is common in libraries that work with TailwindCSS.

## ✨ Why did I build this?

- ⚙️ **Useful components** usually missing in other libraries
- 🧠 **Ready-to-use hooks** for everyday recurring problems
- 🎯 Focused on **filling the gaps** left by other libraries
- 💅 Fully compatible with **TailwindCSS**

---

## 🚀 Installation

```bash
pnpm add secret-lib tailwind-merge clsx
```

Then, you'll need to update your `tailwind.config.js`

```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/secret-lib/**/*.{js,ts,jsx,tsx}' /** add this line */
  ],
  darkMode: 'class',
  /** Other configs */
}
```
