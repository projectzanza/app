export const job = {
  data: {
    id: 1,
    title: 'job title',
    tag_list: ['tag1', 'tag2', 'tag3'],
    created_at: '01-01-2017',
    updated_at: '01-01-2017',
  },
};

export const jobNullValues = {
  data: {
    id: 1,
    title: 'job title',
    tag_list: null,
    per_diem: null,
    created_at: '01-01-2017',
    updated_at: '01-01-2017',
  },
};

export const jobs = {
  data: [
    {
      id: 1,
      title: 'job title 1',
      tag_list: ['tag1', 'tag2', 'tag3'],
      created_at: '01-01-2017',
      updated_at: '01-01-2017',
    },
    {
      id: 2,
      title: 'job title 2',
      tag_list: ['tag1', 'tag2', 'tag3'],
      created_at: '01-01-2017',
      updated_at: '01-01-2017',
    },
  ],
};

export const jobsWithEstimates = {
  data: [
    {
      id: 1,
      title: 'job title 1',
      tag_list: ['tag1', 'tag2', 'tag3'],
      created_at: '01-01-2017',
      updated_at: '01-01-2017',
      meta: {
        current_user: {
          estimate: {
            id: 1000,
            job_id: 1,
            user_id: 1100,
            per_diem: '$100',
            days: 1,
            total: '$100'
          }
        }
      }
    },
    {
      id: 2,
      title: 'job title 2',
      tag_list: ['tag1', 'tag2', 'tag3'],
      created_at: '01-01-2017',
      updated_at: '01-01-2017',
      meta: {
        current_user: {
          estimate: {
            id: 2000,
            job_id: 2,
            user_id: 2200,
            per_diem: '$200',
            days: 1,
            total: '$200'
          }
        }
      }
    },
  ],
}
