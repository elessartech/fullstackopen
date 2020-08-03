const dummy = (blogs) => {
    return 1
}

const totalLikes = (lists) => {
    let totalLikesCallback = ( acc, cur ) => Number(acc) + Number(cur) ;
    return lists.length <= 0 ? 0 : lists.map(list => list.likes).reduce(totalLikesCallback)
}
  
module.exports = {
    dummy,
    totalLikes
}