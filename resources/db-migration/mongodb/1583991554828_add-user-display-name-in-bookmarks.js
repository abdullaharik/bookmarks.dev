// update user display name for bookmarks - displayName should be set in user profile
db.users.find().forEach(
  function (user) {
    // print('\nuser ' + user._id);

    if ( user.profile && user.profile.displayName ) {
      print('\nuser display name :' + user.profile.displayName);
      db.bookmarks.find({userId: user.userId}).forEach(
        function (bookmark) {
          print(bookmark._id);
          db.bookmarks.update(
            {_id: bookmark._id},
            {"$set": {"userDisplayName": user.profile.displayName}}
          );
        }
      )
    }
  }
);

db.users.update(
  {userId: '4c617f2b-2bad-498b-a9c6-4e9a8c303798'},
  {"$set": {"profile.displayName": 'ama'}}
)
