export enum Relationships {
    "all" = "all",
    "friend" = "friend"
}

export namespace Responses {
    interface Friend {
        steamid: string;
        relationship: Relationships;
        name?: string,
    }

    interface FriendsList {
        friends: Friend[];
    }

    export interface FriendsResponse {
        friendslist: FriendsList;
    }

    export interface ProfileResponse {
        response: Players
    }

    interface Players {
        players: Player[]
    }

    interface Player {
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

    interface Games {
        game_count: number,
        games: Game[],
    }

    interface Game {
        appid: number,
        playtime_forever: number;
    }

    interface AchievementResponse {
        playerstats: Achievements
    }

    interface Achievements {
        steamID: string,
        gameName: string,
        acheivements?: Achievement[]
        success: boolean,
    }

    interface Achievement {
        apiname: string,
        achieved: string,
        unlocktime: number
    }
}