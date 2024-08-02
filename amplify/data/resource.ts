import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    username: a.string().required(),
    email: a.string().required(),
    name: a.string(),
    bio: a.string(),
    profilePicture: a.string(),
    role: a.enum(['USER', 'ADMIN']),
    organizedPageants: a.hasMany('Pageant', 'organizerId'),
    participatedPageants: a.hasMany('UserPageant', 'userId'),
    posts: a.hasMany('Post', 'authorId'),
    comments: a.hasMany('Comment', 'authorId'),
    sentMessages: a.hasMany('Message', 'senderId'),
    receivedMessages: a.hasMany('Message', 'receiverId'),
    reviews: a.hasMany('Review', 'authorId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  Pageant: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    location: a.string(),
    organizerId: a.string(),
    organizer: a.belongsTo('User', 'organizerId'),
    participants: a.hasMany('UserPageant', 'pageantId'),
    sponsored: a.boolean(),
    category: a.string(),
    events: a.hasMany('Event', 'pageantId'),
    reviews: a.hasMany('Review', 'pageantId'),
    sponsorId: a.string(),
    sponsor: a.belongsTo('Sponsor', 'sponsorId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  UserPageant: a.model({
    userId: a.string(),
    pageantId: a.string(),
    user: a.belongsTo('User', 'userId'),
    pageant: a.belongsTo('Pageant', 'pageantId'),
    role: a.enum(['PARTICIPANT', 'JUDGE', 'STAFF']),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  Event: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    pageantId: a.string(),
    pageant: a.belongsTo('Pageant', 'pageantId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  Post: a.model({
    content: a.string().required(),
    authorId: a.string(),
    author: a.belongsTo('User', 'authorId'),
    likes: a.integer(),
    comments: a.hasMany('Comment', 'postId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  Comment: a.model({
    content: a.string().required(),
    authorId: a.string(),
    author: a.belongsTo('User', 'authorId'),
    postId: a.string(),
    post: a.belongsTo('Post', 'postId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

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
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),

  Sponsor: a.model({
    name: a.string().required(),
    description: a.string(),
    logo: a.string(),
    website: a.string(),
    sponsoredPageants: a.hasMany('Pageant', 'sponsorId'),
  }).authorization(allow => [
    allow.owner(),
    allow.publicApiKey().to(['read'])
  ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});