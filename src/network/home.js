import { requestNeteaseMusicAPI } from "./request.js"

export function getBanner(type) {
    return requestNeteaseMusicAPI({
        url: 'banner',
        params: {
            "type": type,
        }
    })
}
export function getPageConfig() {
    return requestNeteaseMusicAPI({
        url: '/homepage/block/page',
        params: {}
    })
}
export function getSearchSuggestion(keywords) {
    return requestNeteaseMusicAPI({
        url: '/search/suggest',
        params: { "keywords": keywords }
    })
}
export function getNewestAlbums() {
    return requestNeteaseMusicAPI({
        url: 'album/newest',
        params: {}
    })
}
export function getHotToplist(limit) {
    return requestNeteaseMusicAPI({
        url: '/playlist/track/all',
        params: {
            "id": 19723756,
            "limit": limit,
        }
    })
}
export function getNewToplist(limit) {
    return requestNeteaseMusicAPI({
        url: '/playlist/track/all',
        params: {
            "id": 3779629,
            "limit": limit,
        }
    })
}
export function getOriginalToplist(limit) {
    return requestNeteaseMusicAPI({
        url: '/playlist/track/all',
        params: {
            "id": 2884035,
            "limit": limit,
        }
    })
}

export function getHotArtists(limit) {
    return requestNeteaseMusicAPI({
        url: 'top/artists',
        params: {
            "limit": limit,
        }
    })
}
export function getHotDJ(limit) {
    return requestNeteaseMusicAPI({
        url: 'dj/toplist/popular',
        params: {
            "limit": limit,
        }
    })
}
export function getSong(id) {
    return requestNeteaseMusicAPI({
        url: 'song/detail',
        params: {
            "ids": id,
        }
    })
}
export function getLyric(id) {
    return requestNeteaseMusicAPI({
        url: 'lyric',
        params: {
            "id": id,
        }
    })
}
export function getComment(type, id, sortType = "2", pageNo = 1, cursor) {
    return requestNeteaseMusicAPI({
        url: '/comment/new',
        params: {
            "type": type,
            "id": id,
            "sortType": sortType,
            "pageNo": pageNo,
            "cursor": cursor,
        }
    })
}
export function getRecommandableList() {
    return requestNeteaseMusicAPI({
        url: '/personalized',
        params: {
            "limit": 8,
        }
    })
}

export function getPlayList(id) {
    return requestNeteaseMusicAPI({
        url: '/playlist/detail',
        params: {
            "id": id,
        }
    })
}
export function getDetailSearch(keywords, type) {
    return requestNeteaseMusicAPI({
        url: '/cloudsearch',
        params: {
            "keywords": keywords,
            "limit": 20,
            "type": type,
        }
    })
}
export function getNormalSearch(keywords, type) {
    return requestNeteaseMusicAPI({
        url: '/search',
        params: {
            "keywords": keywords,
            "limit": 20,
            "type": type,
        }
    })
}