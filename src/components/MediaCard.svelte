<script lang="ts">
  import type { Media } from "marked-alm";
  import { onMount } from "svelte";
  import { getAnilistMedia } from "$lib";

  const { media }: Media = $props();

  let mediaData: Record<string, any> | undefined = $state();

  onMount(async () => {
    const { id } = media;
    const mediaId = parseInt(id);
    try {
      const {
        data: { Media: mediaResult },
      } = await getAnilistMedia(mediaId);
      mediaData = mediaResult;
    } catch (error) {
      // If the API call to fetch data fails, use mock data for the demo.
      mediaData = {
        data: {
          Media: {
            id: 98478,
            title: {
              userPreferred: "3-gatsu no Lion 2",
            },
            coverImage: {
              large:
                "https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx98478-dF3mpSKiZkQu.jpg",
            },
            type: "ANIME",
            format: "TV",
            status: "FINISHED",
            averageScore: 89,
            popularity: 108758,
            genres: ["Drama", "Slice of Life"],
            season: "FALL",
            seasonYear: 2017,
            bannerImage:
              "https://s4.anilist.co/file/anilistcdn/media/anime/banner/98478-BDH64RDmBlr8.jpg",
            startDate: {
              year: 2017,
            },
          },
        },
      };
      console.log(error);
    }
  });
</script>

{#if mediaData}
  <a
    href="https://anilist.co/anime/{mediaData.id}/{mediaData.title
      .userPreferred}"
  >
    <div
      class="inline-flex bg-[rgb(237,241,245)] max-w-xl min-h-16 text-sm leading-4 rounded-lg overflow-hidden"
    >
      <div
        class="col-span-1 bg-cover bg-center bg-no-repeat w-12 flex-shrink-0"
        style:background-image={`url('${mediaData.coverImage.large}')`}
      ></div>
      <div
        class="w-full flex flex-col items-center] justify-between p-2.5 text-ellipsis overflow-hidden"
      >
        <div
          class="text-blue-400 text-ellipsis whitespace-normal font-semibold overflow-hidden"
        >
          {mediaData.title.userPreferred}
        </div>
        <div
          class="text-gray-400 text-xs text-ellipsis whitespace-normal overflow-hidden"
        >
          <span>{mediaData.format} ·</span>
          <span>{mediaData.status} ·</span>
          <span>{mediaData.season} {mediaData.seasonYear} ·</span>
          <span>{mediaData.averageScore}%</span>
        </div>
      </div>
    </div>
  </a>
{/if}
