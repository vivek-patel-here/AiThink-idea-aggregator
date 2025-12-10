async function fetchTopXPost(keyword) {
  try {
    const res = await fetch(
      `https://serpapi.com/search.json?q=site:twitter.com+${encodeURIComponent(
        keyword
      )}&api_key=${process.env.SERP_API_KEY}`,
      {
        method: "GET",
      }
    );
    const parsedResponse = await res.json();
    const topXPosts = parsedResponse.organic_results.map((post) => {
      return {
        title: post.title,
        link: post.link,
        displayed_link: post.displayed_link,
        snippet: post.snippet,
        source: post.source,
      };
    });

    return topXPosts;
  } catch (err) {
    console.log("Unable to fetch related X-posts due to following error \n",err);
    return [];
  }
}

module.exports={fetchTopXPost};