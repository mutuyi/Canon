export function processPageConfig(pageConfig) {
    let itemList = []
    for (let ele of pageConfig.data.data.blocks[1].creatives[0].resources) {
        itemList.push(ele)
    }
    for (let i = 1; i < 6; i++) {
        itemList.push(pageConfig.data.data.blocks[1].creatives[i].resources[0])
    }
    return itemList
}

export function insertPlayList(var1, var2) {
    let playList = JSON.parse(JSON.stringify(var1))
    let existList = []
        // console.log("playList:", playList)
        // console.log("songConfig:", var2)
    for (let ele of playList) {
        // console.log("ele", ele)
        existList.push(ele.id)
    }
    // console.log("existList:", existList)
    // console.log("songConfig.id:", var2.id)
    // console.log(existList.indexOf(var2.id))
    if (existList.indexOf(var2.id) == -1) {
        // console.log("playList:", playList)
        // console.log("songConfig:", var2)
        playList.push(var2)
            // console.log("playList:", playList)
            // console.log("songConfig:", var2)
        return playList
    } else {
        return playList
    }
}
export function concatPlayList(var1, var2) {
    let playList = JSON.parse(JSON.stringify(var1))
    let addplayList = JSON.parse(JSON.stringify(var2))
    let tempArray
    let existList = []

    for (let ele of playList) {
        existList.push(ele.id)
    }
    for (let ele of addplayList) {
        if (existList.indexOf(ele.id) == -1) {
            playList.push(ele)
        }
    }
    return playList
}

export function deleteASongOfPlayList(var1, var2) {
    let playList = JSON.parse(JSON.stringify(var1))

    for (let i = 0; i < playList.length; i++) {
        if (playList[i].id == var2) {
            playList.splice(i, 1)
        }
    }
    return playList
}
export function getNextSong(var1, var2) {
    let playList = JSON.parse(JSON.stringify(var1))
    let index
    console.log(playList)
    for (let i = 0; i < playList.length; i++) {
        if (playList[i].id == var2.id) {
            index = i
            console.log(index)
        }
    }
    if ((index + 1) >= playList.length) {
        index = 0
        return playList[0]
    } else {
        console.log(playList[index + 1])
        return playList[index + 1]
    }
}
export function getPrevSong(var1, var2) {
    let playList = JSON.parse(JSON.stringify(var1))
    let index
    console.log(playList)
    for (let i = 0; i < playList.length; i++) {
        if (playList[i].id == var2.id) {
            index = i
            console.log(index)
        }
    }
    if ((index - 1) < 0) {
        index = playList.length - 1
        return playList[index]
    } else {
        return playList[index - 1]
    }
}