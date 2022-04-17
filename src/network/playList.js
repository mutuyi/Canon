import { requestNeteaseMusicAPI } from "./request.js"


export function getPlayListComment(id, limit, offset) {
    return requestNeteaseMusicAPI({
        url: '/comment/playlist',
        params: {
            "id": id,
            "limit": limit,
            "offset": offset,
        }
    })
}