<script lang="ts">
  import type { Video } from "marked-alm";

  const { video }: Video = $props();

</script>

<!-- svelte-ignore a11y_media_has_caption -->
<video class="max-w-full inline-block rounded-lg overflow-hidden" controls muted autoplay={false}>
  <source src="{video.src}" type="video/webm">Your browser does not support the video tag.
</video>
