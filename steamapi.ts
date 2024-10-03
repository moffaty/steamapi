import axios, { AxiosInstance } from 'axios';
import { Responses, Relationships } from './responses';

enum ISteamUser {
    "point" = "ISteamUser",
    "friends" = "GetFriendList",
    "profile" = "GetPlayerSummaries",
}

enum ISteamNews {
    "point" = "ISteamUser",

}

enum ISteamUserStats {
    "point" = "ISteamUserStats",
    "achievements" = "GetPlayerAchievements",
    "gameStats" = "GetUserStatsForGame",
}

enum IPlayerService {
    "point" = "IPlayerService",
    "games" = "GetOwnedGames",
    
}

enum Version {
    "v0001" = 1,
    "v0002" = 2
}

const SteamEndPoints = {
    news : ISteamNews,
    stats : ISteamUserStats,
    user: ISteamUser,
    service: IPlayerService,
};

type SteamServices = typeof ISteamUser | typeof ISteamNews | typeof ISteamUserStats | typeof IPlayerService;

export class SteamAPI {
    private SteamHost: string = 'https://api.steampowered.com/';
    Format: string = 'json';
    apiKey: string;
    private axiosInstance: AxiosInstance;

    constructor(key: string) {
        this.apiKey = key; 
        this.axiosInstance = axios.create({
            baseURL: this.SteamHost,
            timeout: 5000,
        });
    }

    private async doRequest<T>(endPoint: SteamServices, func: string, version: string, args: object): Promise<any> {
        const url: string = this.urlCollect(endPoint, func, version, args);
        return this.getReponse<T>(url);
    }

    private async getReponse<T>(url: string): Promise<T> {
        try {
            const response = await this.axiosInstance.get(url);
            return JSON.parse(JSON.stringify(response.data)) as T;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error message:', error.message);
            } else {
                console.error('Unexpected error:', error);
            }
            throw error; 
        }
    }

    private urlCollect(endPoint: SteamServices, func: string, version: string, args: object): string {
        const argsQuery = new URLSearchParams(Object.entries(args)).toString();
        return `${this.SteamHost}/${endPoint["point"]}/${func}/${version}/?format=${this.Format}&key=${this.apiKey}&${argsQuery}`
    }

    public async GetFriendList(steamid: string, relationship: Relationships = Relationships["friend"]): Promise<Responses.FriendsResponse> {
        const args = {
            "steamid": steamid,
            "relationship": relationship
        }
        const list = await this.doRequest<Responses.FriendsResponse>(SteamEndPoints["user"], SteamEndPoints["user"]["friends"], Version[1], args);
        const friends = list['friendslist']['friends'];
        for (const friend of friends) {
            await this.GetProfileInfo(friend.steamid).then(profile => {
                const name = profile.response.players[0].personaname;
                friend.name = name;
            });
        }
        return list;
    }

    public async GetProfileInfo(steamid: string): Promise<Responses.ProfileResponse> {
        const args = {
            "steamids": steamid
        }
        return await this.doRequest<Responses.ProfileResponse>(SteamEndPoints["user"], SteamEndPoints["user"]["profile"], Version[2], args);
    }

    public async GetPlayerAchievements(steamid: string, appid: string, l?: string): Promise<Responses.AchievementResponse> {
        const args = {
            steamid,
            appid,
            l
        }
        return await this.doRequest<Responses.AchievementResponse>(SteamEndPoints["stats"], SteamEndPoints["stats"]["achievements"], Version[1], args);
    }
    
    public async GetOwnedGames(steamid: string): Promise<Responses.GamesResponse> {
        const args = {
            steamid
        }
        return await this.doRequest<Responses.GamesResponse>(SteamEndPoints["service"], SteamEndPoints["service"]["games"], Version[1], args);
    }

    public async GetUserStatsForGame(steamid: string, appid: string, l?: string): Promise<Responses.UserStatsResponse> {
        const args = {
            steamid,
            appid,
            l
        }
        return await this.doRequest<Responses.UserStatsResponse>(SteamEndPoints["stats"], SteamEndPoints["stats"]["gameStats"], Version[2], args);
    }
}

const steamapi = new SteamAPI('11431FAA05650478564E77D2B7003ED2');
steamapi.GetPlayerAchievements('76561198818864500', '570').then(data => console.log(JSON.stringify(data, null, 2))).catch(error => console.log(error))
