import { expectType } from 'tsd';
import { Responses } from './responses';

const profileResponse = `{
  "response": {
    "players": [
      {
        "personaname": "сила соли",
        "loccountrycode": "NE"
      }
    ]
  }
}`;

const newsResponse = `{
  "appnews": {
    "appid": 440,
    "newsitems": [
      {
        "gid": "6250522009513746506",
        "title": "As Team Fortress 2 veterans gaze at Deadlock with interest and envy, steadfast fans are still waiting for Valve to notice them",
        "url": "https://steamstore-a.akamaihd.net/news/externalpost/PC Gamer/6250522009513746506",
        "is_external_url": true,
        "author": "Justin Wagner",
        "contents": "It’s proba...",
        "feedlabel": "PC Gamer",
        "date": 1726160863,
        "feedname": "PC Gamer",
        "feed_type": 0,
        "appid": 440
      }
    ],
    "count": 3614
  }
}`

const news: Responses.NewsResponse = JSON.parse(newsResponse) as Responses.NewsResponse;
const profile: Responses.ProfileResponse = JSON.parse(profileResponse) as Responses.ProfileResponse;

expectType<string>(news.appnews.newsitems[0].gid);
expectType<string>(profile.response.players[0].personaname);

const game: Responses.Game = {
    appid: 550,
    playtime_forever: 310
};

expectType<number>(game.appid);
expectType<number>(game.playtime_forever);