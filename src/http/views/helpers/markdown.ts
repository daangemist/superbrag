import marked from 'marked';
import sanitizemeHtml from 'sanitize-html';

export const markdown = (input: string) => marked(sanitizemeHtml(input));
