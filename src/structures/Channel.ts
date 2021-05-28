import { VoiceRegionStructure } from "./VoiceState";
import User from "./User";

export interface ChannelMentionObject {
    id: string;
    guild_id: string;
    type: ChannelType;
    name: string;
}

enum ChannelType {
    GUILD_TEXT = 0,
    DM = 1,
    GUILD_VOICE = 2,
    GROUP_DM = 3,
    GUILD_CATEGORY = 4,
    GUILD_NEWS = 5,
    GUILD_STORE = 6,
    GUILD_NEWS_THREAD = 10,
    GUILD_PUBLIC_THREAD = 11,
    GUILD_PRIVATE_THREAD = 12,
    GUILD_STAGE_VOICE = 13,
}

interface OverwriteStructure {
    id: string;
    type: 0 | 1;
    allow: string;
    deny: string;
}

enum VideoQualityMode {
    AUTO = 1,
    FULL = 2,
}

interface ThreadMetadataStructure {
    archived: boolean;
    archiver_id?: string;
    auto_archive_duration: number;
    archive_timestamp: string;
    locked?: boolean;
}

interface ThreadMember {
    id: string;
    user_id: string;
    join_timestamp: string;
    flags: number;
}

class Channel {
    id: string;
    type: ChannelType;
    guild_id?: string;
    position?: number;
    permissions_overwrites?: OverwriteStructure[];
    name?: string;
    topic?: string;
    nsfw?: boolean;
    last_message_id?: string;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: User[];
    icon?: string;
    owner_id?: string;
    application_id?: string;
    parent_id?: string;
    last_pin_timestamp?: string | null;
    rtc_region?: VoiceRegionStructure;
    video_quality_mode?: VideoQualityMode;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMetadataStructure;
    member?: ThreadMember;
    constructor() {}
}

export default Channel;
