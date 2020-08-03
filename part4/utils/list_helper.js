const dummy = (lists) => {
    return 1
}

const totalLikes = (lists) => {
    const totalLikesCallback = ( acc, cur ) => Number(acc) + Number(cur) ;
    return lists.length === 0 ? 0 : lists.map(list => list.likes).reduce(totalLikesCallback)
}

const favoriteBlog = (lists) => {
    const favoriteBlogCallback = ( acc, cur ) => (acc.likes > cur.likes) ? acc : cur
    if (lists.length === 0) { return 0}
    const favBlog = lists.reduce(favoriteBlogCallback)
    return {title: favBlog.title, author: favBlog.author, likes: favBlog.likes}
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}