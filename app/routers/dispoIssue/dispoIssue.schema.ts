import { Type } from '@sinclair/typebox';

export const createDispoIssueSchema = {
  tags: ['DispoIssue : Create DispoIssue'],
  body: Type.Object({
    dispositiveId: Type.Number(),
    description: Type.String(),
    date: Type.String({ format: 'date-time' }),
    status: Type.String({ default: 'pending' }),
    maintainerId: Type.Optional(Type.Union([Type.Number(), Type.Null()]))
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        dispositiveId: Type.Number(),
        description: Type.String(),
        date: Type.String({ format: 'date-time' }),
        status: Type.String(),
        maintainerId: Type.Union([Type.Number(), Type.Null()])
      })
    })
  }
};

export const getDispoIssuesSchema = {
  tags: ['DispoIssue : Get all DispoIssues'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          dispositiveId: Type.Number(),
          description: Type.String(),
          date: Type.String({ format: 'date-time' }),
          status: Type.String(),
          maintainerId: Type.Union([Type.Number(), Type.Null()]),
          Dispositive: Type.Object({
            id: Type.Number(),
            type: Type.String(),
            start_date: Type.String({ format: 'date-time' }),
            end_date: Type.String({ format: 'date-time' }),
            initial_state: Type.String(),
            MAC: Type.String(),
            state: Type.String(),
            product_id: Type.Number()
        
          }),
          Maintainer: Type.Union([
            Type.Object({
                id: Type.Number(),
                first_name: Type.String(),
                last_name: Type.String(),
                email: Type.String({ format: 'email' }),
                phone: Type.Union([Type.String(), Type.Null()])
                          }),
            Type.Null()
          ])
        })
      )
    })
  }
};

export const getDispoIssueByIdSchema = {
  tags: ['DispoIssue : Get DispoIssue By Id'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        dispositiveId: Type.Number(),
        description: Type.String(),
        date: Type.String({ format: 'date-time' }),
        status: Type.String(),
        maintainerId: Type.Union([Type.Number(), Type.Null()]),
        Dispositive: Type.Object({
            id: Type.Number(),
            type: Type.String(),
            start_date: Type.String({ format: 'date-time' }),
            end_date: Type.String({ format: 'date-time' }),
            initial_state: Type.String(),
            MAC: Type.String(),
            state: Type.String(),
            product_id: Type.Number()
        
          }),
          Maintainer: Type.Union([
            Type.Object({
                id: Type.Number(),
                first_name: Type.String(),
                last_name: Type.String(),
                email: Type.String({ format: 'email' }),
                phone: Type.Union([Type.String(), Type.Null()])
                        }),
          Type.Null()
        ])
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const getDispoIssuesByDispositiveIdSchema = {
  tags: ['DispoIssue : Get DispoIssues By Dispositive Id'],
  params: Type.Object({
    dispositiveId: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          dispositiveId: Type.Number(),
          description: Type.String(),
          date: Type.String({ format: 'date-time' }),
          status: Type.String(),
          maintainerId: Type.Union([Type.Number(), Type.Null()]),
          Dispositive: Type.Object({
            id: Type.Number(),
            type: Type.String(),
            start_date: Type.String({ format: 'date-time' }),
            end_date: Type.String({ format: 'date-time' }),
            initial_state: Type.String(),
            MAC: Type.String(),
            state: Type.String(),
            product_id: Type.Number()
        
          }),
          Maintainer: Type.Union([
            Type.Object({
                id: Type.Number(),
                first_name: Type.String(),
                last_name: Type.String(),
                email: Type.String({ format: 'email' }),
                phone: Type.Union([Type.String(), Type.Null()])
                          }),
            Type.Null()
          ])
        })
      )
    })
  }
};

export const assignMaintainerToDispoIssueSchema = {
  tags: ['DispoIssue : Assign Maintainer To DispoIssue'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    maintainerId: Type.Number()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        dispositiveId: Type.Number(),
        description: Type.String(),
        date: Type.String({ format: 'date-time' }),
        status: Type.String(),
        maintainerId: Type.Number(),
        Dispositive: Type.Object({
            id: Type.Number(),
            type: Type.String(),
            start_date: Type.String({ format: 'date-time' }),
            end_date: Type.String({ format: 'date-time' }),
            initial_state: Type.String(),
            MAC: Type.String(),
            state: Type.String(),
            product_id: Type.Number()
        
          }),
          Maintainer: 
            Type.Object({
                id: Type.Number(),
                first_name: Type.String(),
                last_name: Type.String(),
                email: Type.String({ format: 'email' }),
                phone: Type.Union([Type.String(), Type.Null()])
                      })
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const updateDispoIssueSchema = {
  tags: ['DispoIssue : Update DispoIssue'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      dispositiveId: Type.Optional(Type.Number()),
      description: Type.Optional(Type.String()),
      status: Type.Optional(Type.String()),
      maintainerId: Type.Optional(Type.Union([Type.Number(), Type.Null()]))
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        dispositiveId: Type.Number(),
        description: Type.String(),
        date: Type.String({ format: 'date-time' }),
        status: Type.String(),
        maintainerId: Type.Union([Type.Number(), Type.Null()]),
        Dispositive: Type.Object({
            id: Type.Number(),
            type: Type.String(),
            start_date: Type.String({ format: 'date-time' }),
            end_date: Type.String({ format: 'date-time' }),
            initial_state: Type.String(),
            MAC: Type.String(),
            state: Type.String(),
            product_id: Type.Number()
        
          }),
          Maintainer: Type.Union([
            Type.Object({
                id: Type.Number(),
                first_name: Type.String(),
                last_name: Type.String(),
                email: Type.String({ format: 'email' }),
                phone: Type.Union([Type.String(), Type.Null()])
                        }),
          Type.Null()
        ])
      })
    }),
    400: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const deleteDispoIssueSchema = {
  tags: ['DispoIssue : Delete DispoIssue'],
  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    }),
    500: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};