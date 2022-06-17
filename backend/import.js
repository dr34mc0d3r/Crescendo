/* create recipes, specials tables and import the Crescendo JSON data 

https://jsonparser.org/  with URL 
https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json

*/


?????
async function getGithubId (accessToken) {
  const response = await fetch('https://api.github.com/user', {
   headers: {
    Authorization: `token ${accessToken}`,
    Accept: 'application/json'
   }
  })
  if (response.status !== 200) { throw Error(`getGithubId ${response.status} ${accessToken}`) }
  const { id: githubId } = await response.json()
  return githubId
 }






const json = [
    {
      id: "1",
      msg: "hi",
      tid: "2022-05-05 23:35",
      fromWho: "hello1@email.cpm",
    },
    {
      id: "2",
      msg: "there",
      tid: "2022-05-05 23:45",
      fromWho: "hello2@email.cpm",
    },
  ];
  
  for (const obj of json) {
    console.log(obj.id);
  }