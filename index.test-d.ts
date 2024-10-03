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

const profile: Responses.ProfileResponse = JSON.parse(profileResponse) as Responses.ProfileResponse;

expectType<string>(profile.response.players[0].personaname);

const game: Responses.Game = {
    appid: 550,
    playtime_forever: 310
};

expectType<number>(game.appid);
expectType<number>(game.playtime_forever);