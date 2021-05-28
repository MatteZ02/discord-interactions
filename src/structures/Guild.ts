import VoiceState, { VoiceRegionStructure } from "./VoiceState";
import Emoji from "./Emoji";
import Role from "./Role";
import GuildMember from "./GuildMember";
import Channel from "./Channel";
import StageInstance from "./interfaces/StageInstance";

enum VerificationLevel {
    NONE = 0,
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3,
    VERY_HIGH = 4,
}

enum DefaultMessageNotificationLevel {
    ALL_MESSAGE = 0,
    ONLY_MENTIONS = 1,
}

enum ExplicitContentFilterLevel {
    DISABLED = 0,
    MEMBERS_WITHOUT_ROLES = 1,
    ALL_MEMBERS = 2,
}

type GuildFeature =
    | "ANIMATED_ICON"
    | "BANNER"
    | "COMMERCE"
    | "COMMUNITY"
    | "DISCOVERABLE"
    | "FEATURABLE"
    | "INVITE_SPLASH"
    | "MEMBER_VERIFICATION_GATE_ENABLED"
    | "NEWS"
    | "PARTNERED"
    | "PREVIEW_ENABLED"
    | "VANITY_URL"
    | "VERIFIED"
    | "VIP_REGIONS"
    | "WELCOME_SREEN_ENABLED";

enum MFALevel {
    NONE = 0,
    ELEVATED = 1,
}

enum SystemChannelFlags {
    SUPPRESS_JOIN_NOTIFICATIONS = 1 << 0,
    SUPPRESS_PREMIUM_SUBSCRIPTIONS = 1 << 1,
    SUPPRESS_GUILD_REMINDER_NOTIFICATIONS = 1 << 2,
}

enum PremiumTier {
    NONE = 0,
    TIER_1 = 1,
    TIER_2 = 2,
    TIER_3 = 3,
}

interface WelcomeScreen {
    description: string
    welcome_channels: WelcomeScreenChannel[]
}

interface WelcomeScreenChannel {
    channel_id: string
    description: string
    emoji_id: string
    emoji_name: string
}

class Guild {
    id: string;
    name: string;
    icon: string;
    icon_hash?: string;
    spash: string;
    discovery_splash: string;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region: VoiceRegionStructure;
    afk_channel_id: string;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string;
    verification_level: VerificationLevel;
    default_message_notifications: DefaultMessageNotificationLevel;
    explicit_content_filter: ExplicitContentFilterLevel;
    roles: Role[];
    emojis: Emoji[];
    features: GuildFeature[];
    mfa_level: MFALevel;
    applicaiton_id: string;
    system_channel_id: string;
    system_channel_flags: SystemChannelFlags;
    rules_channel_id: string
    joined_at?: string
    large?: boolean
    unavailable?: boolean
    member_count?: number
    voice_states?: VoiceState[]
    members?: GuildMember[]
    channels?: Channel[]
    threads?: Channel[]
    presences?: object[]
    max_presences?: number
    max_members?: number
    vanity_url_code: string
    description: string
    banner: string
    premium_tier: PremiumTier
    premium_subscriptions_count?: number
    preferred_locale: string
    public_updates_channel_id: string
    max_video_channel_users?: number
    approximate_member_count?: number
    approximate_presence_count?: number
    welcome_screen?: WelcomeScreen
    nsfw_level: number
    stage_instances?: StageInstance[]
    constructor() {}
}

export default Guild;
