getProfile: (req, res, callback) => {
  return Promise.all([
    Followship.findAndCountAll({ where: { followingId: req.params.id } }),
    Followship.findAndCountAll({ where: { followerId: req.params.id } }),
    User.findOne({
      where: { id: req.params.id },
    }),
    Tweet.findAll({ include: [Reply, Like, User], where: { UserId: req.params.id } }),
    Reply.findAll({ include: { model: Tweet, include: User }, where: { UserId: req.params.id } }),
    Like.findAll({ include: [Tweet, User], where: { UserId: req.params.id } })
  ])
    // .then(user => { return callback({ user }) })
    .then(([follower, following, user, tweets, replies, likes]) => {
      callback({
        follower: follower,
        following: following,
        user: user,
        name: user.name,
        tweets: tweets.map(r => ({
          ...r.dataValues,
          likeTweetCount: r.Likes.length,
          replyTweetCount: r.Replies.length,
          isLiked: r.Likes.map(d => d.UserId).includes(helpers.getUser(req).id) || null
        })),
        isFollowed: helpers.getUser(req).Followings.map(d => d.id).includes(user.id),
        replies,
        likes
      })
    })
},