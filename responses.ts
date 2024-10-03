export enum Relationships {
    "all" = "all",
    "friend" = "friend"
}

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
}