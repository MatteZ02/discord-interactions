import User from "../User";

export default interface Team {
    icon: string;
    id: string;
    members: TeamMember[];
    name: string;
    owner_user_id: string;
}

interface TeamMember {
    membership_state: MembershipState;
    permissions: string[];
    team_id: string;
    user: User;
}

enum MembershipState {
    INVITED = 1,
    ACCEPTED = 2,
}
