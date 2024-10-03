import { Relationships } from "./enums";
export namespace Responses {
    export interface Friend {
        steamid: string;
        relationship: Relationships;
        name?: string,
    }

    export interface FriendsList {
        friends: Friend[];
    }

    export interface FriendsResponse {
        friendslist: FriendsList;
    }

    export interface ProfileResponse {
        response: Players
    }

    export interface Players {
        players: Player[]
    }

    export interface Player {
        "steamid": string,
        "communityvisibilitystate": number,
        "profilestate": number,
        "personaname": string,
        "commentpermission": number,
        "profileurl": string,
        "avatar": string,
        "avatarmedium": string,
        "avatarfull": string,
        "avatarhash": string,
        "personastate": number,
        "primaryclanid": string,
        "timecreated": number,
        "personastateflags": number,
        "loccountrycode": string,
        "locstatecode": string
    }

    export interface GamesResponse {
        response: Games
    } 

    export interface Games {
        game_count: number,
        games: Game[],
    }

    export interface Game {
        appid: number,
        playtime_forever: number;
    }

    export interface AchievementResponse {
        playerstats: Achievements
    }

    export interface Achievements {
        steamID: string,
        gameName: string,
        acheivements?: Achievement[]
        success: boolean,
    }

    export interface Achievement {
        apiname: string,
        achieved: string,
        unlocktime: number
    }

    export interface UserStatsResponse {
        playerstats: UserStats,
    }

    interface UserStats {
        steamID: string,
        gameName: string,
        achievements: UserStat[]
    }

    interface UserStat {
        name: string,
        achieved: number,
    }

    export interface NewsResponse {
        appnews: News;
    }

    export interface News {
        appid: string,
        newsitems: NewItem[]
    }

    export interface NewItem {
        gid: string,
        title: string,
        url: string,
        is_external_url: boolean,
        author: string,
        contents: string,
        feedlabel: string,
        date: number,
        feedname: string,
        feed_type: number,
        appid: number,
        tags?: string[]
    }

    export interface GlobalAchievementsResponse {
        achievementpercentages: GlobalAchievements,
    }

    export interface GlobalAchievements {
        achievements: GlobalAchievement[],
    }

    export interface GlobalAchievement {
        name: string,
        percent: number
    }

    export interface RecentlyGamesResponse {
        response: RecentlyGames,
    }

    export interface RecentlyGames {
        total_count: number,
        games: RecentlyGame[]
    }

    export interface RecentlyGame {
        appid: number,
        name: string,
        playtime_2weeks: number,
        playtime_forever: number,
        img_icon_url: string
    }
}