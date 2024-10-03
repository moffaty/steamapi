enum ISteamUser {
    "point" = "ISteamUser",
    "friends" = "GetFriendList",
    "profile" = "GetPlayerSummaries",
}

enum ISteamNews {
    "point" = "ISteamNews",
    "app" = "GetNewsForApp",
}

enum ISteamUserStats {
    "point" = "ISteamUserStats",
    "achievements" = "GetPlayerAchievements",
    "gameStats" = "GetUserStatsForGame",
    "globalStats" = "GetGlobalAchievementPercentagesForApp"
}

enum IPlayerService {
    "point" = "IPlayerService",
    "games" = "GetOwnedGames",
    "recently" = "GetRecentlyPlayedGames",
}

export enum Versions {
    "v0001" = 1,
    "v0002" = 2
}

export enum Relationships {
    "all" = "all",
    "friend" = "friend"
}

export type SteamServices = typeof ISteamUser | typeof ISteamNews | typeof ISteamUserStats | typeof IPlayerService;

export const SteamEndPoints = {
    news : ISteamNews,
    stats : ISteamUserStats,
    user: ISteamUser,
    service: IPlayerService,
};

export type SteamQuery = {
    steamid?: string
    appid?: string,
    gameid?: string,
    count?: number,
    maxlength?: number,
    l?: string,
    relationship?: Relationships;
    steamids?: string
}

