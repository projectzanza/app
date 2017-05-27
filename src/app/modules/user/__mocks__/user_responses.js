export const user = {
  data: {
    id: 1,
    uid: 'user1@test.com',
    username: 'user1',
  },
};

export const nullUser = {
  data: null,
};

export const signOut = {
  data: {
    success: true,
  },
};

export const users = {
  data: [
    {
      id: 1,
      uid: 'user1@test.com',
      username: 'user1',
    },
    {
      id: 2,
      uid: 'user2@test.com',
      username: 'user1',
    },
  ],
};
export const collaboratingUsers = {
  data: [
    {
      id: 1,
      uid: 'user1@test.com',
      username: 'user1',
      meta: {
        job: {
          collaboration_state: 'invited',
        },
      },
    },
    {
      id: 2,
      uid: 'user2@test.com',
      username: 'user2',
      meta: {
        job: {
          collaboration_state: 'invited',
        },
      },
    },
    {
      id: 3,
      uid: 'user3@test.com',
      username: 'user3',
      meta: {
        job: {
          collaboration_state: 'interested',
        },
      },
    },
    {
      id: 4,
      uid: 'user4@test.com',
      username: 'user4',
      meta: {
        job: {
          collaboration_state: 'interested',
        },
      },
    },
    {
      id: 5,
      uid: 'user5@test.com',
      username: 'user5',
      meta: {
        job: {
          collaboration_state: 'prospective',
        },
      },
    },
    {
      id: 5,
      uid: 'user5@test.com',
      username: 'user5',
      meta: {
        job: {
          collaboration_state: 'prospective',
        },
      },
    },
    {
      id: 6,
      uid: 'user6@test.com',
      username: 'user6',
      meta: {
        job: {
          collaboration_state: 'awarded',
        },
      },
    },
    {
      id: 7,
      uid: 'user7@test.com',
      username: 'user7',
      meta: {
        job: {
          collaboration_state: 'participant',
        },
      },
    },
  ],
};
