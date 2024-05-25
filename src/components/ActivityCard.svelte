<script lang="ts">
  import type { markdownParserFn } from "$lib/marked-parser";
  import type { ComponentType, SvelteComponent } from "svelte";
  import { onMount, mount } from "svelte";

  const { htmlString, parsedAnilistData }: ReturnType<markdownParserFn> =
    $props();

  const componentPath = async (
    component: ComponentType<SvelteComponent<any, any, any>>,
    targetSelector: string,
    props: any,
  ) => {
    const targetEl = document.querySelector(targetSelector);
    if (!targetEl) return;
    mount(component, { target: targetEl, props });
  };

  onMount(async () => {
    for (const anilistData of parsedAnilistData) {
      const { type, selector } = anilistData;
      switch (type) {
        case "media":
          componentPath(
            (await import("$components/MediaCard.svelte")).default,
            selector,
            anilistData,
          );
          break;
        case "youtube":
          componentPath(
            (await import("$components/YoutubeCard.svelte")).default,
            selector,
            anilistData,
          );
          break;
        case "video":
          componentPath(
            (await import("$components/VideoCard.svelte")).default,
            selector,
            anilistData,
          );
          break;
        case "spoiler":
          componentPath(
            (await import("$components/SpoilerCard.svelte")).default,
            selector,
            anilistData,
          );
          break;

        default:
          break;
      }
    }
  });
</script>

<div class="markdown">
  {@html htmlString}
</div>

<style lang="postcss">
  :global(.markdown) {
    @apply bg-gray-50 rounded-lg p-5 break-words overflow-hidden;
    word-break: break-word;
    color: rgb(92, 114, 138);
  }
  :global(.markdown h1) {
    @apply text-lg;
  }
  :global(.markdown img) {
    @apply inline align-text-top rounded-lg;
  }
  :global(.markdown hr) {
    @apply border-2 border-gray-300 my-2 rounded-lg;
  }
  :global(.markdown a) {
    @apply text-blue-400;
  }
  :global(.markdown ul) {
    @apply block ps-7 my-4 list-disc whitespace-normal;
  }
  :global(.markdown ol) {
    @apply block list-decimal my-4 ps-7;
  }
  :global(.markdown blockquote) {
    @apply inline-block border-l-4 border-gray-300 px-4 my-2;
  }
  :global(.markdown pre, .markdown pre code) {
    @apply whitespace-pre-wrap;
  }
  /* :global(.markdown .markdown-spoiler) {
    @apply min-w-[30px] inline-block relative rounded overflow-hidden cursor-pointer;
  }
  :global(.markdown .markdown-spoiler::after) {
    @apply absolute inset-0 w-full h-full bg-neutral-800 content-[''];
  } */
  :global(.markdown p) {
    @apply my-4;
  }
  :global(.markdown p:last-of-type, .markdown blockquote p:last-of-type) {
    @apply mb-0;
  }
  :global(.markdown p:first-of-type, .markdown blockquote p) {
    @apply mt-0;
  }
</style>
