import Emoji from "./Emoji";

// https://discord.com/developers/docs/interactions/message-components#buttons-button-object
export interface ButtonObject {
    type: 2
    style: ButtonStyle
    label?: string
    emoji?: Emoji
    custom_id?: string
    url?: string
    disabled?: boolean
}

// https://discord.com/developers/docs/interactions/message-components#buttons-button-styles
export enum ButtonStyle {
    "primary" = 1,
    "secondary" = 2,
    "success" = 3,
    "danger" = 4,
    "link" = 5,
}
// https://discord.com/developers/docs/interactions/message-components#component-types
enum ComponentType {
    "actionRow" = 1,
    "button" = 2,
}
// Component object https://discord.com/developers/docs/interactions/message-components#component-object
class Component {
    type: ComponentType;

    style?: 1 | 2 | 3 | 4 | 5 | 6;

    label?: string;

    emoji?: Emoji;

    custom_id?: string;

    url?: string;

    disabled?: boolean;
}

export default Component
