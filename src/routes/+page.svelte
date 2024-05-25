<script lang="ts">
    /**
     Note that this code is only to demonstrate how the library works,
     you need to optimize it according to your specific use case.
     In this code, information about Anime/Manga (Media) is fetched separately via the Anilist API, 
     which is inefficient because Anilist limits the number of API calls per minute.
     A better approach is to fetch all the information in a single API call since Anilist supports this.
    */
    import { getAnilistSocialFeed, markdownParser } from "$lib";
    import { onMount } from "svelte";

    import ActivityCard from "$components/ActivityCard.svelte";
    import type { markdownParserResult } from "$lib/marked-parser";
    const activities = $state<ReturnType<typeof markdownParser>[]>([]);

    onMount(async () => {
        const markdown = [];
        try {
            const feeds = await getAnilistSocialFeed();
            const {
                data: {
                    Page: { activities },
                },
            } = feeds;
            // Push activities to
            markdown.push(...activities);
        } catch (error) {
            console.log(error);
            // If the API call to fetch data fails, use mock data for the demo.
            activities.push(
                ...[
                    {
                        htmlString:
                            '<p><center>I can\'t get the sound of Hibike Euphonium out of my head<br>The beautiful emotions it carries through its music</center><br><img src="https://i.imgur.com/kc0ISzM.png" width="720"></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<h1>100 Days Anime Challenge #41</h1>\n<blockquote>\n<p>favorite canon couple</p>\n</blockquote>\n<p>Not something I really think about since not many series I like have romance, and the ones that do usually don\'t handle it the best (<em>cough cough</em> Attack on Titan). But one couple I really liked is Okabe and Kurisu from Steins;Gate. They have a fun dynamic in the first half, but it\'s only when things get serious does their bond starts to develop, making for some very moving scenes (Episode 22 still makes me sad). Probably the best couple off the top of my head.</p>\n<p><img src="https://media1.tenor.com/m/Rg30vIscHRwAAAAC/anime.gif" width="220"></p>\n<hr>\n<p>Some other people are doing this challenge also, check them out.</p>\n<p><a href="/user/Kur0San" target="_blank" rel="noopener noreferrer">@Kur0San</a>, <a href="/user/Alen28" target="_blank" rel="noopener noreferrer">@Alen28</a>, <a href="/user/AshK89" target="_blank" rel="noopener noreferrer">@AshK89</a>, <a href="/user/Lym" target="_blank" rel="noopener noreferrer">@Lym</a>, <a href="/user/Elfiee" target="_blank" rel="noopener noreferrer">@Elfiee</a>, <a href="/user/Leafer" target="_blank" rel="noopener noreferrer">@Leafer</a></p>\n<p rel="0.406751563394943"></p>',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p></p><center> <img src="https://64.media.tumblr.com/af4dd1756b93cc10b4190295148ca121/38df1424bcc381b9-fb/s540x810/f7f714ad8dbb0121758d36e90adcbf92e85ea77b.gifv" width="50%"><p></p>\n</center>',
                        parsedAnilistData: [
                            {
                                type: "spoiler",
                                selector: '[rel="0.406751563394943"]',
                                spoiler: {
                                    contents:
                                        '<img src="https://files.catbox.moe/hcaevv.png" width="220">',
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            '<p><center><img src="https://imgur.com/uLnEZAI.png" width=""></p>\n<hr>\n<p><strong>Day 2 : Current Favorite Series</strong></p>\n<hr>\n<p><span rel="0.9840931460453024"></span><br><img src="https://i.kym-cdn.com/photos/images/newsfeed/000/706/061/7d7.gif" width=""></p>\n<p>I was stuck between a bunch.. I\'m not really one to have just one favorite but if I had a stand out anime of all my favorites, it would most likely be this one. I will fit in the others throughout this challenge ^^</p>\n<p>The story, the visuals, the way it traps you into thinking it\'s just another wholesome magical girl series but it ends up being way darker than you can imagine. I know a lot of people won\'t watch this series because of the "cutesy" artstyle of the anime but please don\'t let that fool you from it being a good series. The way the animation is done and the way the story is told has to be peak fiction IMO.</p>\n<p>I\'ll link one of my favorite scenes from the Rebellion movie below;<br><strong>SPOILER WARNING FOR MOVIE 3</strong><br><span rel="0.27918276646203855"></span></p>\n<hr>\n<p></p><p rel="0.12366595163051808"></p><br></center><p></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>tried wuthering waves for 5 minutes and immediately uninstalled</p>\n",
                        parsedAnilistData: [
                            {
                                type: "youtube",
                                selector: '[rel="0.27918276646203855"]',
                                youtube: {
                                    id: "3Jm7Q8RsR_Y",
                                },
                            },
                            {
                                type: "spoiler",
                                selector: '[rel="0.12366595163051808"]',
                                spoiler: {
                                    contents:
                                        '<img src="https://imgur.com/AkdozUH.png" width="">',
                                },
                            },
                            {
                                type: "media",
                                selector: '[rel="0.9840931460453024"]',
                                media: {
                                    type: "ANIME",
                                    id: "11981",
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            '<p><center><br><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""><br><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""></p>\n<h1>Happy Birthday to <a href="https://anilist.co/character/64523/Yuuki-Konno" target="_blank" rel="noopener noreferrer">Yuuki Konno</a> and <a href="https://anilist.co/character/127840/Tomoe-Koga" target="_blank" rel="noopener noreferrer">Tomoe Koga</a>! &lt;3</h1>\n<h3><em>May 23, 2024</em></h3>\n<p><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""><br><a href="https://anilist.co/forum/thread/71409/comment/2637389" target="_blank" rel="noopener noreferrer"><img src="https://i.postimg.cc/7hdQF257/2305-yuuu1.png"></a></p>\n<p><a href="https://anilist.co/forum/thread/71409/comment/2637388" target="_blank" rel="noopener noreferrer"><img src="https://i.postimg.cc/TPcDTrtg/2305-tom.png"></a></p>\n<h4>Click on the banner if you want to participate!</h4>\n<p><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""></p>\n<p><img src="https://64.media.tumblr.com/0a218c8128ff6b35ca7dfe6b2a80c7d6/tumblr_nlj7v0uF2v1tjrgk5o1_500.gif" width="353"> <img src="https://i.pinimg.com/originals/a9/51/0c/a9510c2f0a86cb2993a7035f6108ea7b.gif" width="350"><br><img src="https://steamuserimages-a.akamaihd.net/ugc/1001394007097562720/5A9347042CA06E3EE5F36B65EF0C65B4B66D99E5/?imw=5000&amp;imh=5000&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false" width="350"></p>\n<p><img src="https://i.imgur.com/1qI1mxG.gif" width="350"> <img src="https://steamuserimages-a.akamaihd.net/ugc/1016068311789753486/C8D510117D0A61BA80010396BCBF2FEE0EA010EF/?imw=512&amp;&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false" width="350"> <img src="https://steamuserimages-a.akamaihd.net/ugc/772849587141635099/32936A92499E05D2FBCB345E8AB7F165CA9F38AF/?imw=5000&amp;imh=5000&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false" width="350"></p>\n<p><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""></p>\n<h1>The Badges (Credits to <a href="/user/RHN81" target="_blank" rel="noopener noreferrer">@RHN81</a>!):</h1>\n<p><img src="https://i.postimg.cc/RhyKGC2g/2305-yuu1.png" width="220">  <img src="https://i.postimg.cc/8zWBKWpM/2305-tom2.png" width="220"> </p>\n<p>Fanart source for the badge: <a href="https://www.pixiv.net/en/artworks/99315932" target="_blank" rel="noopener noreferrer">1</a> <a href="https://www.zerochan.net/4062409" target="_blank" rel="noopener noreferrer">2</a></p>\n<p><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""></p>\n<h3>Events hosted by <a href="/user/RHN81" target="_blank" rel="noopener noreferrer">@RHN81</a></h3>\n<p><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""><br><img src="https://i.postimg.cc/3rZLqnjp/Dancing-Line-v1-Yellow.gif" width=""><br></center></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>In the middle of making a game atm for my exam at school, and damn it's so hard, like it's only a simple game and I can't even do it, plus my game is ass. I'm definitely gonna fail this, lmao!</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<center><h1><strong>Thanks for the nomination <a href="/user/Mugiwaraboshi" target="_blank" rel="noopener noreferrer">@Mugiwaraboshi</a></strong></h1></center><br><center><a href="https://anilist.co/activity/734115925" target="_blank" rel="noopener noreferrer">link on how to participate</a></center><br><center><img src="https://i.postimg.cc/6q1BpHnC/Line-v3-1.gif" width=""></center><br><center><h1><strong>Number 1 <center></center></strong></h1><br><center>Type:project revival<center><br><center> <span rel="0.3379971621390918"></span> </center><br><center><h1><strong>Number 2 <center></center></strong></h1><br><center>Type:Reanimation </center><br><center> <span rel="0.3793214319450662"></span> </center><br><center><h1><strong>Number 3<center></center></strong></h1><strong> </strong><br><center>Type:project revival</center><br><center> <span rel="0.12554134044091114"></span></center>\n\n<p><center><img src="https://i.postimg.cc/6q1BpHnC/Line-v3-1.gif" width=""></center><br>I nominate  <a href="/user/ShiryuGito" target="_blank" rel="noopener noreferrer">@ShiryuGito</a> <a href="/user/mity" target="_blank" rel="noopener noreferrer">@mity</a> <a href="/user/Ry0h" target="_blank" rel="noopener noreferrer">@Ry0h</a> and anyone else interested</p>\n</center></center></center></center></center>',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p>I watched Close Encounters of the Third Kind. I don\'t understand why it\'s so popular lol, that seems to happen with a lot of movies I\'ve watched lately.</p>\n<p><img src="https://media1.tenor.com/m/cZBHCTkzmWUAAAAd/byuntear-anime.gif" width="220"></p>\n',
                        parsedAnilistData: [
                            {
                                type: "media",
                                selector: '[rel="0.3379971621390918"]',
                                media: {
                                    type: "ANIME",
                                    id: "98478",
                                },
                            },
                            {
                                type: "media",
                                selector: '[rel="0.3793214319450662"]',
                                media: {
                                    type: "ANIME",
                                    id: "356",
                                },
                            },
                            {
                                type: "media",
                                selector: '[rel="0.12554134044091114"]',
                                media: {
                                    type: "ANIME",
                                    id: "21709",
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            "<p>Dragon Ball really jumped the shark when they introduced that little ass dude with the monkey tail eating a really big fish</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>damn 208 animes (kinda because it also counts specials and OVAs) I remember that before creating this account I liked to play videogames but now the only game I constantly open is Azur Lane</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p>One Piece Chapter 1115 - </p><p rel="0.03741792248245934"></p><p></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>Poppy playtime chapter 3 is the most disturbing chapter and I think I might throw up</p>\n",
                        parsedAnilistData: [
                            {
                                type: "spoiler",
                                selector: '[rel="0.03741792248245934"]',
                                spoiler: {
                                    contents:
                                        "This chapter have some weird scene/moments, like why Demaro Black crew dress up as the Kidd pirates for some reason even though the real crew were destroyed. Two, Foxy only have a small ship with only Pocha &amp; Hamburg with him (What happened to his Big Crew &amp; Ship?). And three, the final chapters show Vegapunk saying that the Great War is still going. What War?<br>(Only 25% of the Void Century have been revealed, hope the next chapter Vegapunk messenge show/tell more about it)",
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            "<p>wind breaker ep 8 was crazyyy bro wtf was that ending</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p>sometimes i think about how this manga about a 14yo girl who ends up in a romantic relationship with her 25yo step brother was in my middle school library as a kid<br><span rel="0.20716763881437106"></span></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>maybe it's time to make a come back here... y/n?</p>\n",
                        parsedAnilistData: [
                            {
                                type: "media",
                                selector: '[rel="0.20716763881437106"]',
                                media: {
                                    type: "MANGA",
                                    id: "30469",
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            "<p>Only 38 more days till I let myself read a romance between a necrophiliac hospital guard and cannibal maternity doctor (saving the best for last). book haul coming soon.</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            "<p>not me putting the 10000th show on my watchlist knowing I'm most likely not watching that</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p><img src="https://pbs.twimg.com/media/GOM50kuWYAAu8hs?format=jpg&amp;name=large" width=""></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p><img src="https://i.imgur.com/Dluonh8.png" width="220"></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<h1><center>Sometimes, the show is the only advertising you need.</center></h1>\n<h1><center><em>Martian Successor Nadesico</em>, but it\'s the Italians.</center></h1>\n<hr>\n<p><center><span rel="0.8649599412216642"></span></center></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p>She\'s really into the Garfield movie</p>\n<p><img src="https://cdn.discordapp.com/attachments/1098042311948116060/1243369381090820107/20240523_190228.jpg?ex=66513979&amp;is=664fe7f9&amp;hm=19bf6fa704ba1fda8aedac9ec211f6a9f859713c209095c024b0f123f7a42472&amp;" width="420"></p>\n',
                        parsedAnilistData: [
                            {
                                type: "youtube",
                                selector: '[rel="0.8649599412216642"]',
                                youtube: {
                                    id: "K-UQjmzpm5s",
                                },
                            },
                        ],
                    },
                    {
                        htmlString:
                            "<p>I love laying in bed, and the feeling of the mattress under my body. I love feeling tangible, like I do exist, like im noticeable. i love being aware of myself, and it feels so soothing to hear my ears ring and the air going through my lungs. its great to be alive! i recommend it!!!</p>\n",
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p><center><strong>My response to her when she asked how she was when it was Duno Day gonna read this know bye</strong></center><br><center><img src="https://i.imgur.com/2IJWHVB.jpg" width="220"></center></p>\n',
                        parsedAnilistData: [],
                    },
                    {
                        htmlString:
                            '<p>Love to see that so many people are having fun with my <a href="https://anilist.co/activity/734115925" target="_blank" rel="noopener noreferrer">“Scenario” </a> post! :D</p>\n<p>Click the link to participate if you’d like! Just a stupid fun scenario to provoke a “What if” thought</p>\n',
                        parsedAnilistData: [],
                    },
                ] as markdownParserResult[],
            );
        }
        // Parser anilist markdown to html string
        activities.push(
            ...markdown.map((activity) => markdownParser(activity.text)),
        );
    });
</script>

<div class="max-w-screen-md flex flex-col gap-4 mx-auto py-8">
    {#each activities as activity}
        <ActivityCard {...activity} />
    {/each}
</div>
