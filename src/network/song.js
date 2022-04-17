import { requestNeteaseMusicAPI } from "./request.js"


export function getSongComment(id, limit, offset) {
    return requestNeteaseMusicAPI({
        url: '/comment/music',
        params: {
            "id": id,
            "limit": limit,
            "offset": offset,
        }
    })
}