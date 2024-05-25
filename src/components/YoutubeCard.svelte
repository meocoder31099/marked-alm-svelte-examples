<script lang="ts">
  import type { Youtube } from "marked-alm";

  const { youtube }: Youtube = $props();

  let isShowPlayer = $state(false);
</script>

<div
  class="relative max-w-lg h-52 bg-no-repeat bg-cover bg-center rounded-lg overflow-hidden"
  style:background-image={`url('https://i.ytimg.com/vi/${youtube.id}/hqdefault.jpg')`}
>
  {#if !isShowPlayer}
    <button class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
    onclick={() => isShowPlayer = true}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="fill-gray-200/60 w-20 h-20 hover:fill-gray-100 transition-colors duration-300"
        ><path
          d="M21.593 7.203a2.506 2.506 0 0 0-1.762-1.766C18.265 5.007 12 5 12 5s-6.264-.007-7.831.404a2.56 2.56 0 0 0-1.766 1.778c-.413 1.566-.417 4.814-.417 4.814s-.004 3.264.406 4.814c.23.857.905 1.534 1.763 1.765 1.582.43 7.83.437 7.83.437s6.265.007 7.831-.403a2.515 2.515 0 0 0 1.767-1.763c.414-1.565.417-4.812.417-4.812s.02-3.265-.407-4.831zM9.996 15.005l.005-6 5.207 3.005-5.212 2.995z"
        ></path></svg
      >
    </button>
  {:else}
    <iframe class="w-full h-full"
      frameborder="0"
      src="https://www.youtube.com/embed/{youtube.id}?autoplay=1&amp;autohide=1"
      title="Youtube embed"
    ></iframe>
  {/if}
</div>
