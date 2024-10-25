export type Comment = {
    currentUser: User;
    comments:    CommentElement[];
}

export type CommentElement = {
    id:          number;
    content:     string;
    createdAt:   string;
    score:       number;
    user:        User;
    replies?:    CommentElement[];
    replyingTo?: string;
}

export type User = {
    image:    Image;
    username: string;
}

export type Image = {
    png:  string;
    webp: string;
}
