const { describe, test, expect } = require('jest')

const {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  updateUserAdmin
} = require('./controllers/user.controller.js')

describe('User Endpoints as Admin', () => {
  const ADMIN_REQ = {
    user: {
      id: '65cc4682f41e4411bfda1c33'
    },
    params: {
      userId: '65cc4682f41e4411bfda1c33'
    },
    isAdmin: true
  }

  const DELETE_REQ = {
    user: {
      id: '65cc4682f41e4411bfda1c33'
    },
    params: {
      userId: '65deacaef1e01b568288738d'
    },
    isAdmin: true
  }

  const UPDATE_REQ = {
    user: {
      id: '65cc4682f41e4411bfda1c33'
    },
    isAdmin: true,
    params: {
      userId: '65d9c017025337547a7ff89d'
    },
    body: {
      username: 'anewuser',
      password: '',
      profile_picture: '',
      email: ''
    }
  }

  const UPDATE_ADMIN_REQ = {
    isAdmin: true,
    params: {
      userId: '65cc4682f41e4411bfda1c33'
    }
  }

  test('GET all users from api/v1/user/', async () => {
    const res = {
      code: 0,
      body: {},
      status: (input) => {
        this.code = input
      },
      json: (input) => {
        this.body = input
      }
    }

    await getUsers(ADMIN_REQ, res)

    expect(res.code).toEqual(200)
    expect(res.body).toHaveProperty('users')
    expect(res.body).toHaveProperty('totalUsers')
  })

  test('GET a user from api/v1/user/:id', async () => {
    const res = {
      code: 0,
      body: {},
      status: (input) => {
        this.code = input
      },
      json: (input) => {
        this.body = input
      }
    }

    await getUser(ADMIN_REQ, res)

    expect(res.code).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('first_name')
    expect(res.body).toHaveProperty('last_name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('isAdmin')
    expect(res.body).toHaveProperty('profile_picture')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
    expect(res.body).toHaveProperty('__v')
  })

  test('DELETE a user from api/v1/user/:id', async () => {
    const res = {
      code: 0,
      body: {},
      status: (input) => {
        this.code = input
      },
      json: (input) => {
        this.body = input
      }
    }

    await deleteUser(DELETE_REQ, res)

    expect(res.code).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })

  test('PATCH a user information api/v1/user/:id', async () => {
    const res = {
      code: 0,
      body: {},
      status: (input) => {
        this.code = input
      },
      json: (input) => {
        this.body = input
      }
    }

    await updateUser(UPDATE_REQ, res)

    expect(res.code).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('first_name')
    expect(res.body).toHaveProperty('last_name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('isAdmin')
    expect(res.body).toHaveProperty('profile_picture')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
    expect(res.body).toHaveProperty('__v')
  })

  test('PATCH a user to admin status api/v1/user/admin/:id', async () => {
    const res = {
      code: 0,
      body: {},
      status: (input) => {
        this.code = input
      },
      json: (input) => {
        this.body = input
      }
    }

    await updateUserAdmin(UPDATE_ADMIN_REQ, res)

    expect(res.code).toEqual(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('first_name')
    expect(res.body).toHaveProperty('last_name')
    expect(res.body).toHaveProperty('isAdmin')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('profile_picture')
    expect(res.body).toHaveProperty('createdAt')
    expect(res.body).toHaveProperty('updatedAt')
    expect(res.body).toHaveProperty('__v')
  })
})
