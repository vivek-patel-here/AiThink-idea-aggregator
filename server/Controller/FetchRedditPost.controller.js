async function fetchTopRedditPost(keyword) {
  try {
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(
        keyword
      )}&sort=top&t=month`,
      {
        method: "GET",
      }
    );
    const parsedResponse = await res.json();
    const topRedditPost = parsedResponse.data.children
      .slice(0, 8)
      .map((post) => {
        return {
          title: post.data.title,
          author: post.data.author_fullname,
          link: post.data.url,
          bodyContent: post.data.selftext,
        };
      });

    return topRedditPost;
  } catch (err) {
    console.log("Unable to fetch the related reddit Posts due to follwong error \n",err);
    return [];
  }
}

module.exports={fetchTopRedditPost};