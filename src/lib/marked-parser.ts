import type { Youtube, Video, Media, Spoiler } from 'marked-alm';
import { marked } from "marked";
import { markedAlm } from "marked-alm";
import { sanitize } from "$lib";
type parsedAnilistData = (Youtube | Video | Media | Spoiler)[];
export interface markdownParserResult {
  htmlString: string,
  parsedAnilistData: parsedAnilistData
}
export type markdownParserFn = (markdown: string) => markdownParserResult

let tempParsedAnilistData: parsedAnilistData = [];

// Create marked alm
const { extensions, hooks, tokenizer } = markedAlm({
  preprocessOptions: {
    // Handle youtube embedded in markdown
    youtube({ type, selector, youtube }) {
      tempParsedAnilistData.push({
        type,
        selector,
        youtube
      })
    },
    // Handle user taged in markdown
    user(data) {
      const { user: { username } } = data;
      // "By default, the parser will use links to Anilist users.
      // This behavior can be overridden via the `renderer`."
      data.renderer = `<a target='_blank' href='/user/${username}'>@${username}</a>`
    },
    // Handle video embedded in markdown
    video({ type, selector, video }) {
      tempParsedAnilistData.push({
        type,
        selector,
        video
      })
    }
  },
  postprocessOptions: {
    // Handle Anime/Manga embedded in markdown
    media({ type, selector, media }) {
      tempParsedAnilistData.push({
        type,
        selector,
        media
      })
    },
    // Add html sanitization
    sanitize(htmlString) {
      return sanitize(htmlString)
    },
    // Handle Spoiler
    spoiler({ type, selector, spoiler }) {
      tempParsedAnilistData.push({
        type,
        selector,
        spoiler
      })
    }
  }
})

// Config marked
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

// Add marked alm extension to marked
marked.use(extensions);
marked.use(hooks);
marked.use(tokenizer);

export const markdownParser: markdownParserFn = (markdown) => {
  const parsedAnilistData: parsedAnilistData = tempParsedAnilistData;
  tempParsedAnilistData = []
  const htmlString = marked(markdown) as string;
  return {
    htmlString,
    parsedAnilistData
  };
}