<script lang="ts">
  import type { Spoiler } from "marked-alm";

  const { spoiler }: Spoiler = $props();

  let isShowSpoiler = $state(false);

</script>


<span class="bg-gray-200/60" class:hidden={!isShowSpoiler}>
  {@html spoiler.contents || ''}
</span>
<button onclick={() => isShowSpoiler = !isShowSpoiler} class:bg-gray-100={!isShowSpoiler} class="text-blue-400 text-xs px-2 rounded-lg"><span>{ isShowSpoiler ? 'Hidden' : 'Spoiler, click to view'}</span></button>
