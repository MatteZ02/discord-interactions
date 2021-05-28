interface RoleTags {
    bot_id?: string;
    integration_id?: string;
    premium_subscriper?: null;
}

class Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTags;
    constructor() {}
}

export default Role;
