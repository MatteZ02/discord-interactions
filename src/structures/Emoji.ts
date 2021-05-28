import Role from "./Role"
import User from "./User"

// https://discord.com/developers/docs/resources/emoji#emoji-object
class Emoji {
    id: string
    name: string | null
    roles?: Role[]
    user?: User
    require_colons?: boolean
    managed?: boolean
    animated?: boolean
    available?: boolean
    constructor() {}
}

export default Emoji