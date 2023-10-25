/* global WebImporter */
export default {
  transformDOM: ({ document }) => {
    const main = document.querySelector('main');
    // remove header and footer from main
    WebImporter.DOMUtils.remove(main, [
      '.header-container',
      '.footer',
    ]);

    return main;
  },
};
