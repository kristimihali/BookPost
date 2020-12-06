import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup

if (Meteor.users.find().fetch().length == 0 && Posts.find().fetch().length == 0) {
  //  Création de compte avec abonnement
  Accounts.createUser({
    username: "Jayetlan",
    email: "jayetlan@email.fr",
    password: "test123A!",
    profile: {
      profileImage: "/images.jpeg",
      subscriptions: [],
      nbSubscriptions: 0,
      readers: [],
      nbReaders: 0,
      loveScore: 2,
    }
  });
  var jayetlan = Meteor.users.findOne({username: "Jayetlan"});

  Accounts.createUser({
    username: "Kristi",
    email: "kristi@email.fr",
    password: "test123A!",
    profile: {
      profileImage: "/lettreswhite.png",
      subscriptions: [jayetlan],
      nbSubscriptions: 1,
      readers: [jayetlan],
      nbReaders: 1,
      loveScore: 3,
    }
  });
  var kristi = Meteor.users.findOne({username: "Kristi"});

  Meteor.users.update(jayetlan._id, {$addToSet: { "profile.readers": kristi }});
  Meteor.users.update(jayetlan._id, {$inc: { "profile.nbReaders": +1 }});
  Meteor.users.update(jayetlan._id, {$addToSet: { "profile.subscriptions": kristi }});
  Meteor.users.update(jayetlan._id, {$inc: { "profile.nbSubscriptions": +1 }});

  Accounts.createUser({
    username: "Toto",
    email: "toto@email.com",
    password: "test123A!",
    profile: {
      profileImage: "/profile_image.png",
      subscriptions: [kristi],
      nbSubscriptions: 1,
      readers: [jayetlan],
      nbReaders: 1,
      loveScore: 1,
    }
  });
  var toto = Meteor.users.findOne({username: "Toto"});

  Meteor.users.update(jayetlan._id, {$addToSet: { "profile.subscriptions": toto }});
  Meteor.users.update(jayetlan._id, {$inc: { "profile.nbSubscriptions": +1 }});
  Meteor.users.update(kristi._id, {$addToSet: { "profile.readers": toto }});
  Meteor.users.update(kristi._id, {$inc: { "profile.nbReaders": +1 }});

  Accounts.createUser({
    username: "Dark Vador",
    email: "vador@dark.univ",
    password: "test123A!",
    profile: {
      profileImage: "/vador.jpg",
      subscriptions: [jayetlan],
      nbSubscriptions: 1,
      readers: [],
      nbReaders: 0,
      loveScore: 2,
    }
  });
  var vador = Meteor.users.findOne({username: "Dark Vador"});

  Meteor.users.update(jayetlan._id, {$addToSet: { "profile.readers": vador }});
  Meteor.users.update(jayetlan._id, {$inc: { "profile.nbReaders": +1 }});

  Accounts.createUser({
    username: "Macron",
    email: "president@email.fr",
    password: "test123A!",
    profile: {
      profileImage: "/macron.jpg",
      subscriptions: [vador],
      nbSubscriptions: 1,
      readers: [toto, vador],
      nbReaders: 2,
      loveScore: 0,
    }
  });
  var macron = Meteor.users.findOne({username: "Macron"});

  Meteor.users.update(vador._id, {$addToSet: { "profile.subscriptions": macron }});
  Meteor.users.update(vador._id, {$inc: { "profile.nbSubscriptions": +1 }});
  Meteor.users.update(vador._id, {$addToSet: { "profile.readers": macron }});
  Meteor.users.update(vador._id, {$inc: { "profile.nbReaders": +1 }});
  Meteor.users.update(toto._id, {$addToSet: { "profile.subscriptions": macron }});
  Meteor.users.update(toto._id, {$inc: { "profile.nbSubscriptions": +1 }});

  // Création de posts
  Posts.insert({
    postName: "Super lecture !",
    bookAuthor: "Markus Heitz",
    bookTitle: "Les Nains",
    postContent: "Un univers aussi riche que Tolkien ! C'est une saga très intéressante à lire pour les amateurs de fantasy.",
    author: jayetlan,
    date: (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()).toString(),
    createdAt: new Date(),
    loveScore: 2,
    voted: [toto.username, macron.username],
    nbComments: 0,
    comments: [],
    userId: jayetlan._id,
  });
  Posts.insert({
    postName: "De la pure science-fiction",
    bookAuthor: "D.Nolan Clark",
    bookTitle: "Invasion",
    postContent: "Des vaisseaux spatiaux, des robots, de l'action : de la pure science-fiction !!",
    author: vador,
    date: (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()).toString(),
    createdAt: new Date(),
    loveScore: 2,
    voted: [jayetlan.username, toto.username],
    nbComments: 0,
    comments: [],
    userId: vador._id,
  });
  Posts.insert({
    postName: "Mieux que Shakespeare",
    bookAuthor: "Charles Dickens",
    bookTitle: "Oliver Twist",
    postContent: "Une aventure émouvante et rebondissante, écrite par un auteur anglais. Non ce n'est pas Shakespeare, c'est mieux que Shakespeare =)",
    author: toto,
    date: (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()).toString(),
    createdAt: new Date(),
    loveScore: 1,
    voted: [kristi.username],
    nbComments: 0,
    comments: [],
    userId: toto._id,
  });
  Posts.insert({
    postName: "Un classique à lire !!",
    bookAuthor: "Victor Hugo",
    bookTitle: "Les Misérables",
    postContent: "Un peu long, un peu dure mais un classique que l'on ne peut pas manquer.",
    author: kristi,
    date: (new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear()).toString(),
    createdAt: new Date(),
    loveScore: 3,
    voted: [jayetlan.username, macron.username, toto.username],
    nbComments: 0,
    comments: [],
    userId: kristi._id,
  });
}



});
