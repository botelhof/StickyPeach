

export const COLORS = {
    SYSTEM: {
        PRIMARY: "#ff8b4d",
        SECONDARY: "#fff",
        THIRD: "#f2f2f2",
        FOUR: "#888",
        BOTTOM_MENU: {
            ACTIVE_TINT: "#fff",
            INACTIVE_TINT: "#eee",
        },
        CRUD: {
            EDIT: {
                FONT: "#004d99",
                BACK: "#b3d9ff",
            },
            DELETE: {
                FONT: "#ffd9cc",
                BACK: "#b32d00",
            },
            CREATE: {
                FONT: "#eafaea",
                BACK: "#248f24",
            },
            MANAGE: {
                MAIN: "#ff8b4d",
                EDIT: "#004d99",
                DELETE: "#b32d00",
                FAVORITE: "#b32d00",
                ASSOCIATE_STEP_PROPS: "#000",
                BOOK: "#248f24",
                COOK: "#248f24",
                SHOPPING: "#b3d9ff",
                PICK_PICTURE: "#444",
                TAKE_PICTURE: "#777",
                ADD_INGREDIENT: "#004d99",
                ADD_STEP: "#248f24",
                ADD_MATERIAL: "#a35FF4",
            },
        },
        COOKING: {
            CLOSE: {
                FONT: "#CCC",
                BACK: "#444",
            },
            PAGINATION: {
                DOT_INACTIVE: "#CCC",
                DOT_ACTIVE: "#ff8b4d",
                BUTTON_NEXT: "#ff8b4d",
                BUTTON_PREVIOUS: "#ff8b4d",
            }
        },
        STEP_ASSOCIATION: {
            LIST_ITEM_BACK: "#eafaea",
            LIST_ITEM_HEADER_FRONT: "#004d99",
            LIST_ITEM_CONTENT_INGREDIENT: "#ff8b4d",
            LIST_ITEM_CONTENT_MATERIAL: "#a35FF4",
        }
    }
}

export const API_CODES = {
    SUCCESS: 'ok',
}

export const STORAGE_CODES = {
    AUTH_USER: 'AUTH_USER',
}

export const API_ENDPOINTS = {
    BASE: 'https://stickypeach.000webhostapp.com/',
    USER_REGISTRATION: 'user_registration.php',
    SIGN_IN: 'user_signin.php',
    SYNC_REMOTE_TO_LOCAL: 'sync_remote_to_local.php',
    SYNC_LOCAL_TO_REMOTE: 'sync_local_to_remote.php'
}
