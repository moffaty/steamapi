import axios, { AxiosInstance } from 'axios';
import { Responses  } from './responses';
import { SteamServices, SteamEndPoints, Versions, Relationships, SteamQuery } from './enums';

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

    private async doRequest<T>(endPoint: SteamServices, func: string, version: string, args: SteamQuery): Promise<T> {
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
        const list = await this.doRequest<Responses.FriendsResponse>(SteamEndPoints["user"], SteamEndPoints["user"]["friends"], Versions[1], { steamid, relationship });
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
        return await this.doRequest<Responses.ProfileResponse>(SteamEndPoints["user"], SteamEndPoints["user"]["profile"], Versions[2], { steamids: steamid });
    }

    public async GetPlayerAchievements(steamid: string, appid: string, l?: string): Promise<Responses.AchievementResponse> {
        return await this.doRequest<Responses.AchievementResponse>(SteamEndPoints["stats"], SteamEndPoints["stats"]["achievements"], Versions[1], { steamid, appid, l });
    }
    
    public async GetOwnedGames(steamid: string): Promise<Responses.GamesResponse> {
        return await this.doRequest<Responses.GamesResponse>(SteamEndPoints["service"], SteamEndPoints["service"]["games"], Versions[1], { steamid });
    }

    public async GetUserStatsForGame(steamid: string, appid: string, l?: string): Promise<Responses.UserStatsResponse> {
        return await this.doRequest<Responses.UserStatsResponse>(SteamEndPoints["stats"], SteamEndPoints["stats"]["gameStats"], Versions[2], { steamid, appid, l });
    }

    public async GetNews(appid: string, count: number, maxlength: number): Promise<Responses.NewsResponse> {
        return await this.doRequest<Responses.NewsResponse>(SteamEndPoints["news"], SteamEndPoints["news"]["app"], Versions[2], { appid, count, maxlength });
    }

    public async GetGlobalAchievs(gameid: string): Promise<Responses.GlobalAchievementsResponse> {
        return await this.doRequest<Responses.GlobalAchievementsResponse>(SteamEndPoints["stats"], SteamEndPoints["stats"]["globalStats"], Versions[2], { gameid });
    }

    public async GetLastGames(steamid: string): Promise<Responses.RecentlyGamesResponse> {
        return await this.doRequest<Responses.RecentlyGamesResponse>(SteamEndPoints["service"], SteamEndPoints["service"]["recently"], Versions[1], { steamid });
    }
}