declare namespace API {

  type Post = {
    id: number;
    draftId?: number;
    postId?: number;
    title: string;
    content: string;
    published?: boolean;
    authorId?: number;
    author: API.User;
    category?: string;
    viewNum: number;
    likeNum: number;
    collectNum: number;
    commentNum: number;
    commentList?: string;
    publish_time?: string;
    update_time?: string;
    PostTag?: API.Post_Tag[];
    Comment: API.Comment[];
  };

  type PostNew = {
    draftId?: number;
    postId?: number;
    title: string;
    author?: API.User;
    content: string;
    published?: boolean;
    authorId: number;
    category?: string;
    viewNum?: number;
    ikeNum?: number;
    commentNum?: number;
    commentList?: string;
    publish_time?: string;
    update_time?: string;
  };

  type Post_Tag = {
    classesId: number;
    name: string;
    post_id: number;
    tag: API.Tag;
  }
  type PostControllerDeleteDraftParams = {
    id: string;
  };

  type PostControllerDeletePostParams = {
    id: string;
  };

  type PostControllerGetPostByIdParams = {
    id: string;
  };

  type PostControllerGetPublishedPostsParams = {
    current: string | number;
    pageSize: string | number;
  };

  type PostControllerUpdateDraftParams = {
    id: string;
  };

  type PostControllerUpdatePostParams = {
    id: string;
  };

  type Role = {
    id: number;
    role_name: string;
    role_code: string;
    describe: string;
    founder: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    Permission?: API.Permission[];
    User?: API.User[];
  };

  type RoleControllerDeleteRoleParams = {
    id: number;
  };

  type RoleControllerGetRoleByidParams = {
    id: number;
  };

  type RoleControllerGetRolesParams = {
    current: string;
    pageSize: string;
  };

  type RoleNew = {
    role_name: string;
    role_code: string;
    describe: string;
    founder: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
  };

  type Permission = {
    role_id?: string;
    menu_id?: string;
    created_time: string;
    updated_time: string;
    Role?: Role;
    Menu?: API.Menu;
  };

  type PermissionControllerGetRoleUserAccessByidParams = {
    id: number;
  };

  type PermissionNew = {
    role_id: number;
    menu_id: string[];
  };


  type permissionScope = 'role' | 'menu' | 'button';

  type PermissionsNew = {
    name: string;
    founder: number;
    permission_key: string;
    role_id?: number;
    menu_id?: number;
    button_id?: number;
    scope: permissionScope;
    describe?: string;
    created_time: string;
    updated_time: string;
  };

  type User = {
    id: number;
    email: string;
    phone: string;
    password: string;
    role_id: number;
    role_name?: string;
    role_level?: number;
    role_code?: string;
    role?: Role;
    name?: string;
    gender: API.userSex;
    nickName?: string;
    userTag?: API.User_Tag[];
  };
  
  type User_Tag = {
    classesId: number;
    name: string;
    user_id: number;
    tag: API.Tag;
  }

  type UserControllerDeleteDraftParams = {
    id: string;
  };

  type UserControllerGetUserByIdParams = {
    id: string;
  };

  type UserControllerGetUserListParams = {
    current: string | number;
    pageSize: string | number;
    name?: string;
    nickName?: string;
    type?: string
    gender?: 'woman' | 'man';
  };

  type UserNew = {
    email: string;
    phone: string;
    password: string;
    role_id: number;
    role_name?: string;
    role_level?: string;
    role_code?: number;
    name?: string;
    gender: API.userSex;
    nickName?: string;
  };

  type MsgType = 'gd' | 'tz' | 'xx' | 'hd';

  type CommentLike = {
    id: string;
    commentId: number;
    userId: number,
    created_time: string;
    updated_time: string;
  }

  type Comment = {
    id: string;
    content: number;
    isDeleted?: number;
    created_time: string;
    updated_time: string;
    author: API.User
    post: API.Post
    authorId: number;
    postId: number;
    parent?: Comment
    parentId?: string
    replies: Comment[]
    viewNum: number;
    comment_like: CommentLike[]
  };

  type CommentNew = {
    parentId?: string;
    postId: number;
    content: string;
  };

  type CommentMap = Map<string, API.Comment>

  type CommentControllerGetCommentListParams = {
    current: number;
    pageSize: number;
    query?: string
    isDeleted?: string;
    startTime?: string;
    endTime?: string;
    postId?: number;
    authorId?: number;
  };

  type Msg = {
    id: number;
    user_id: number;
    title: string;
    content: number;
    status?: number;
    type: MsgType;
    pinned: number;
    created_time: string;
    updated_time: string;
    author?: API.User
  };

  type MsgNew = {
    user_id: number;
    title: string;
    content: number;
    status?: number;
    type: MsgType;
    pinned: number;
  };

  type MsgControllerGetMsgListParams = {
    current: number;
    pageSize: number;
    title?: string;
    type?: MsgType;
  };

  type TagClasses = {
    id: number;
    user_id: number;
    name: string;
    created_time: string;
    updated_time: string;
    author?: API.User
  };

  type TagClassesNew = {
    user_id: number;
    name: string;
    created_time: string;
    updated_time: string;
    author?: API.User
  };

  type TagType = 'user' | 'post'

  type Tag = {
    id: number;
    user_id: number;
    name: string;
    classesId: number;
    type: TagType;
    created_time: string;
    updated_time: string;
    author?: API.User
    tagClasses?: TagClasses;
  };

  type TagNew = {
    user_id: number;
    name: string;
    classesId: number;
    type: TagType;
    created_time: string;
    updated_time: string;
    author?: API.User
  };

  type TagControllerGetTagListParams = {
    current: number;
    pageSize: number;
    classesId?: number;
    name?: string;
    type?: TagType;
  };

  type Logs = {
    id: number;
    user_id: string;
    content: string;
    ip: string;
    path: string;
    user_agent: string;
    params: string;
    method: string;
    api_url: string;
    created_time: string;
    updated_time: string;
  };

  type userSex = 'woman' | 'man';

  type LogsNew = {
    user_id: string;
    content: string;
    ip: string;
    path: string;
    user_agent: string;
    params: string;
    method: string;
    api_url: string;
    created_time: string;
    updated_time: string;
  };

  type LogsControllerGetRolesParams = {
    current: string;
    pageSize: string;
  };

  type PaginationParams = {
    current: number;
    pageSize: number;
  }

  type Menu = {
    menu_id: number;
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
    permissionList?: string | string[];
    meta?: string;
    extraProperties?: string;
    wrappers?: number;
    hideChildrenInMenu?: number;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
    founder: number;
    isOnlyRead?: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    children?: Menu[];
  };

  type MenuNew = {
    name: string;
    path: string;
    icon?: string;
    component?: string;
    redirect?: string;
    parent_id?: number;
    permissionList?: string | string[];
    meta?: string;
    extraProperties?: string;
    wrappers?: number;
    hideChildrenInMenu?: number;
    hideInMenu?: number;
    hideInBreadcrumb?: number;
    isOnlyRead?: number;
    founder: number;
    sort: number;
    status: number;
    created_time: string;
    updated_time: string;
    children?: Menu[];
  };
  type buttonPermission = {
    id: number;
    name: string;
    founder: number;
    permission_key: string;
    menu_id: number;
    status?: number;
    effect_form: string;
    describe?: string;
    created_time: string;
    updated_time: string;
    menu: API.Menu;
  };

  type ButtonPermissionControllerDeletebuttonPermissionParams = {
    id: number;
  };

  type ButtonPermissionControllerGetbuttonPermissionByidParams = {
    id: string;
  };

  type ButtonPermissionControllerGetbuttonPermissionsParams = {
    current: string;
    pageSize: string;
    name: string;
    button_permission_name?: any;
  };

  type ButtonPermissionControllerGetbuttonPermissionUserAccessByidParams = {
    id: string;
  };

  type buttonPermissionNew = {
    name: string;
    permission_key: string;
    menu_id: number;
    founder: number;
    status?: number;
    effect_form?: string;
    describe?: string;
    created_time: string;
    updated_time: string;
  };

  type RoleMenuPermission = {
    roleId: number;
    menuId: number;
    permissionId: number;
    menu: Menu,
    role: Role,
    button_permission: buttonPermission,
  }

  type PostLike = {
    id: string;
    postId: number;
    userId: number,
    created_time: string;
    updated_time: string;
    user?: User;
    post?: Post;
  }

  type PostComment = {
    id: string;
    content: string
    postId: number;
    authorId: number,
    created_time: string;
    updated_time: string;
    author?: User;
    post?: Post;
  }

  type PostCollection = {
    id: string;
    postId: number;
    userId: number,
    created_time: string;
    updated_time: string;
    user?: User;
    post?: Post;
  }

}
