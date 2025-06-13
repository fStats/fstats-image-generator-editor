# fStats Image Generator Editor

This is the fStats image generator editor repository for the fStats image generator service,
built with Vite, React, and Material UI.

---

## Localization

All translation files are located in the `public/locales/` folder.

### Adding a New Language

To contribute a new translation:

1. **Create a folder** inside `public/locales/` named with the language code, for example:

- `fr` for French
- `de` for German
- `fi` for Finnish  
  *(You can look up language codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) if unsure)*

2. **Register the language** in `src/i18n.ts`:
    ```ts
    export const supportedLanguages = ["en", "fi"]; // Add your language code here
    ```

3. **Add the required translation files** to your folder.  
   Use the files from the `en` folder as a reference.
   Each file corresponds to a section of the site (e.g., `common.json`, etc.).

4. **Run the site locally** to test:
    ```bash
    npm install
    npm run dev
    ```

5. **Open the app**

> 📝 Tip: You don’t need to translate every file immediately — partial translations are welcome and helpful!

---

### Translation Progress

| Code | Language |        Status        |   Translator    |
|:----:|:--------:|:--------------------:|:---------------:|
|  en  | English  | Native (Always 100%) | Syorito Hatsuki |

---

Thanks for helping make fStats accessible to more people!
