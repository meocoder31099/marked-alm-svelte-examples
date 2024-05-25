import createDOMPurify from "dompurify";
import { browser } from "$app/environment";

const DOMPurify = createDOMPurify();
browser && DOMPurify.addHook("afterSanitizeAttributes", (currentNode) => {
  "target" in currentNode &&
    (currentNode.setAttribute("target", "_blank"),
      currentNode.setAttribute("rel", "noopener noreferrer"));
});

export const sanitize = (htmlString: string) => {
  return DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
      "a",
      "b",
      "blockquote",
      "br",
      "center",
      "del",
      "div",
      "em",
      "font",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "hr",
      "i",
      "img",
      "li",
      "ol",
      "p",
      "pre",
      "code",
      "span",
      "strike",
      "strong",
      "ul",
    ],
    ALLOWED_ATTR: [
      "align",
      "height",
      "href",
      "src",
      "target",
      "width",
      "rel",
    ],
  });
};