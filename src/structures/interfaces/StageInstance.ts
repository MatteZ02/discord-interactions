export default interface StageInstance {
    id: string;
    guild_id: string;
    channel_id: string;
    topic: string;
    privary_level: PrivacyLevel;
    discoveralbe_disabled: boolean;
}

enum PrivacyLevel {
    PUBLIC = 1,
    GUILD_ONLY = 2,
}
