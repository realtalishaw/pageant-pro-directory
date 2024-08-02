import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    username: a.string().required(),
    email: a.string().required(),
    name: a.string(),
    bio: a.string(),
    profilePicture: a.string(),
    role: a.enum(['USER', 'ADMIN']),
    pageants: a.hasMany('Pageant', 'organizerId'),
    posts: a.hasMany('Post', 'authorId'),
    sentMessages: a.hasMany('Message', 'senderId'),
    receivedMessages: a.hasMany('Message', 'receiverId'),
    reviews: a.hasMany('Review', 'authorId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Pageant: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    location: a.string(),
    organizerId: a.string(),
    organizer: a.belongsTo('User', 'organizerId'),
    participants: a.hasMany('User', 'pageantId'),
    sponsored: a.boolean(),
    category: a.string(),
    events: a.hasMany('Event', 'pageantId'),
    reviews: a.hasMany('Review', 'pageantId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Event: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    pageantId: a.string(),
    pageant: a.belongsTo('Pageant', 'pageantId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Post: a.model({
    content: a.string().required(),
    authorId: a.string(),
    author: a.belongsTo('User', 'authorId'),
    likes: a.integer(),
    comments: a.hasMany('Comment', 'postId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Comment: a.model({
    content: a.string().required(),
    authorId: a.string(),
    author: a.belongsTo('User', 'authorId'),
    postId: a.string(),
    post: a.belongsTo('Post', 'postId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Message: a.model({
    content: a.string().required(),
    senderId: a.string(),
    sender: a.belongsTo('User', 'senderId'),
    receiverId: a.string(),
    receiver: a.belongsTo('User', 'receiverId'),
    read: a.boolean(),
  }).authorization(allow => [allow.owner()]),

  Review: a.model({
    content: a.string().required(),
    rating: a.integer(),
    authorId: a.string(),
    author: a.belongsTo('User', 'authorId'),
    pageantId: a.string(),
    pageant: a.belongsTo('Pageant', 'pageantId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),

  Sponsor: a.model({
    name: a.string().required(),
    description: a.string(),
    logo: a.string(),
    website: a.string(),
    sponsoredPageants: a.hasMany('Pageant', 'sponsorId'),
  }).authorization(allow => [allow.owner(), allow.public('read')]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});