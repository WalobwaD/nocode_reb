export interface Community {
    id:                          string;
    created_at:                  number;
    updated_at:                  number;
    user_id:                     string;
    community_id:                string;
    title:                       string;
    content:                     string;
    content_type:                string;
    video_link:                  string;
    video_metadata:              VideoMetadata;
    score:                       number;
    status:                      string;
    mentioned_users:             null;
    scheduled_deletion_at:       null;
    feed_score:                  number;
    decayed_score:               number;
    date_poll_end:               null;
    poll_status:                 string;
    reposted_posts_id:           null;
    openai_assistant_id:         string;
    images:                      any[];
    link_metadata:               LinkMetadata;
    gifs:                        any[];
    user_details:                RDetails;
    community_details:           CommunityDetails;
    comments_count:              number;
    is_user_community_creator:   boolean;
    is_user_community_moderator: boolean;
    poll_options:                any[];
    posts_poll_votes_of_users:   boolean;
    emoji_reactions:             any[];
    user_rate:                   null;
}

export interface CommunityDetails {
    id:              string;
    name:            string;
    description:     string;
    creator:         string;
    moderators:      Moderator[];
    official:        boolean;
    website:         string;
    logo:            Logo;
    rules:           any[];
    creator_details: RDetails;
}

export interface RDetails {
    id:                   string;
    user_handle:          string;
    display_name:         string;
    avatar:               null;
    default_avatar_color: string;
    avatar_nft_chain:     null;
    role_id:              number;
    number_of_nfts:       number | null;
    online?:              boolean;
}

export interface Logo {
    url:         string;
    preview_url: string;
}

export interface Moderator {
    user_details: RDetails;
}

export interface LinkMetadata {
    title:       string;
    description: string;
    url:         string;
    images:      any[];
}

export interface VideoMetadata {
}
