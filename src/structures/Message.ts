import Channel, { ChannelMentionObject } from "./Channel";
import GuildMember from "./GuildMember";
import User from "./User";
import Application from "./Application";
import Interaction from "./Interaction";
import Emoji from "./Emoji"
import Component from "./Component"

enum MessageType {
    DEFAULT = 0,
    RECIPIENT_ADD = 1,
    RECIPIENT_REMOVE = 2,
    CALL = 3,
    CHANNEL_NAME_CHANGE = 4,
    CHANNEL_ICON_CHANGE = 5,
    CHANNEL_PINNED_MESSAGE = 6,
    GUILD_MEMBER_JOIN = 7,
    USER_PREMIUM_GUILD_SUBSCRIPTION = 8,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1 = 9,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2 = 10,
    USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3 = 11,
    CHANNEL_FOLLOW_ADD = 12,
    GUILD_DISCOVERY_DISQUALIFIED = 14,
    GUILD_DISCOVERY_REQUALIFIED = 15,
    GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
    GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
    THREAD_CREATED = 18,
    THREAD_STARTER_MESSAGE = 21,
    GUILD_INVITE_REMINDER = 22,
}

interface MessageActivity {
    type: MessageActivityType;
    party_id?: string;
}

enum MessageActivityType {
    JOIN = 1,
    SPECTATE = 2,
    LISTEN = 3,
    JOIN_REQUEST = 5,
}

enum MessageFlags {
    CROSSPOSTED = 1 << 0,
    IS_CROSSPOST = 1 << 1,
    SUPPRESS_EMBEDS = 1 << 2,
    SOURCE_MESSAGE_DELETED = 1 << 3,
    URGENT = 1 << 4,
    HAS_THREAD = 1 << 5,
    EPHEMERAL = 1 << 6,
    LOADING = 1 << 7,
}

interface Sticker {
    id: string;
    pack_id: string;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    format_type: StickerFormat;
}

enum StickerFormat {
    PNG = 1,
    APNG = 2,
    LOTTIE = 3,
}

interface MessageReference {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
    fail_if_not_exists?: boolean;
}

interface Reaction {
    count: number
    me: boolean
    emoji: Emoji
}

// https://discord.com/developers/docs/resources/channel#message-object
class Message {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: User;
    member?: GuildMember;
    content: string;
    timestamp: string;
    edited_timestamp: string;
    tts: boolean;
    mention_everyone: boolean;
    mentions: User & GuildMember[];
    mention_roles: string[];
    mention_channels?: ChannelMentionObject[];
    reactions?: Reaction[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: string;
    type: MessageType;
    activity?: MessageActivity;
    application?: Application;
    application_id?: string;
    message_reference?: MessageReference;
    flags?: MessageFlags;
    stickers?: Sticker[];
    referenced_message?: Message;
    interaction?: Interaction;
    thread?: Channel;
    components?: Component;
    constructor() {}
}

export default Message;
