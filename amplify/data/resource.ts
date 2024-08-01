import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  User: a.model({
    username: a.string().required(),
    email: a.string().required(),
    name: a.string(),
    bio: a.string(),
    profilePicture: a.string(),
    role: a.enum(['USER', 'ADMIN']).required(),
    pageants: a.hasMany('Pageant'),
    posts: a.hasMany('Post'),
    messages: a.hasMany('Message'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Pageant: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    location: a.string(),
    organizer: a.belongsTo('User'),
    participants: a.hasMany('User'),
    sponsored: a.boolean(),
    category: a.string(),
    events: a.hasMany('Event'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Event: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date(),
    pageant: a.belongsTo('Pageant'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Post: a.model({
    content: a.string().required(),
    author: a.belongsTo('User'),
    likes: a.integer(),
    comments: a.hasMany('Comment'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Comment: a.model({
    content: a.string().required(),
    author: a.belongsTo('User'),
    post: a.belongsTo('Post'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Message: a.model({
    content: a.string().required(),
    sender: a.belongsTo('User'),
    receiver: a.belongsTo('User'),
    read: a.boolean(),
  }).authorization([a.allow.owner()]),

  Review: a.model({
    content: a.string().required(),
    rating: a.integer(),
    author: a.belongsTo('User'),
    pageant: a.belongsTo('Pageant'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),

  Sponsor: a.model({
    name: a.string().required(),
    description: a.string(),
    logo: a.string(),
    website: a.string(),
    sponsoredPageants: a.hasMany('Pageant'),
  }).authorization([a.allow.owner(), a.allow.public('read')]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // Add API key for public read access
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});