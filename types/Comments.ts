export interface Comment {
    id:                          string;
    created_at:                  number;
    updated_at:                  number;
    user_id:                     string;
    reply_to:                    null;
    post_id:                     string;
    content:                     string;
    score:                       number;
    mentioned_users:             null;
    is_deleted:                  boolean;
    depth_level:                 number;
    path:                        string;
    child_count:                 number;
    images:                      any[];
    gifs:                        null[];
    user_details:                UserDetails;
    is_user_community_creator:   boolean;
    is_user_community_moderator: boolean;
}

export interface UserDetails {
    id:                   string;
    user_handle:          string;
    display_name:         string;
    avatar:               string;
    default_avatar_color: string;
    avatar_nft_chain:     null;
    role_id:              number;
    online:               boolean;
    number_of_nfts:       null;
    role_details:         RoleDetails;
}

export interface RoleDetails {
    id:   number;
    name: string;
}

export type CommentWithChildren = Comment & {
  children: CommentWithChildren[];
};
