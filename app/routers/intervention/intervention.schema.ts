import { Type } from '@sinclair/typebox';
import { InterventionStatus } from '@prisma/client';

export const createInterventionSchema = {
  tags: ['Intervention : Create intervention'],
  body: Type.Object({
    idMaintainer: Type.Number(),
    idDispositive: Type.Number(),
    description: Type.String(),
    type: Type.String(),
    status: Type.Enum(InterventionStatus, { default: 'pending' }),
    end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
    start_date: Type.Optional(Type.String({ format: 'date-time' })) // ✅ Correction ici
  }),
  response: {
    201: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        idMaintainer: Type.Number(),
        idDispositive: Type.Number(),
        description: Type.String(),
        type: Type.String(),
        status: Type.Enum(InterventionStatus),
        end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
        start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
      })
    })
  }
};

export const getInterventionsSchema = {
tags: ['Intervention : get all interventions'],
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Array(
        Type.Object({
          id: Type.Number(),
          idMaintainer: Type.Number(),
          idDispositive: Type.Number(),
          description: Type.String(),
          type: Type.String(),
          status: Type.Enum(InterventionStatus),
          end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
          start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
        })
      )
    })
  }
};

export const getInterventionByIdSchema = {
    tags: ['Intervention : get Intervention By Id'],

  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        idMaintainer: Type.Number(),
        idDispositive: Type.Number(),
        description: Type.String(),
        type: Type.String(),
        status: Type.Enum(InterventionStatus),
        end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
        start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
      })
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
    })
  }
};

export const getInterventionsByMaintainerSchema = {
    tags: ['Intervention : get maintainer interventions'],

    params: Type.Object({
      idMaintainer: Type.String()
    }),
    response: {
      200: Type.Object({
        success: Type.Literal(true),
        data: Type.Array(
          Type.Object({
            id: Type.Number(),
            idMaintainer: Type.Number(),
            idDispositive: Type.Number(),
            description: Type.String(),
            type: Type.String(),
            status: Type.Enum(InterventionStatus),
            end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
            start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
          })
        )
      }),
      404: Type.Object({
        success: Type.Literal(false),
        message: Type.String()
      })
    }
  };  

export const updateInterventionSchema = {
    tags: ['Intervention : Update Intervention'],

  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Partial(
    Type.Object({
      idMaintainer: Type.Optional(Type.Number()),
      idDispositive: Type.Optional(Type.Number()),
      description: Type.Optional(Type.String()),
      type: Type.Optional(Type.String()),
      status: Type.Optional(Type.Enum(InterventionStatus)),
      end_date: Type.Optional(Type.String({ format: 'date-time' })), // ✅ Correction ici
      start_date: Type.Optional(Type.String({ format: 'date-time' })) // ✅ Correction ici
    })
  ),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: Type.Object({
        id: Type.Number(),
        idMaintainer: Type.Number(),
        idDispositive: Type.Number(),
        description: Type.String(),
        type: Type.String(),
        status: Type.Enum(InterventionStatus),
        end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
        start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
      })
    })
  }
};

export const updateInterventionStatusSchema = {
    tags: ['Intervention : Update Intervention Status'],

    params: Type.Object({
      id: Type.String()
    }),
    body: Type.Object({
      status: Type.Enum(InterventionStatus)
    }),
    response: {
      200: Type.Object({
        success: Type.Literal(true),
        data: Type.Object({
          id: Type.Number(),
          idMaintainer: Type.Number(),
          idDispositive: Type.Number(),
          description: Type.String(),
          type: Type.String(),
          status: Type.Enum(InterventionStatus),
          end_date: Type.String({ format: 'date-time' }), // ✅ Correction ici
          start_date: Type.String({ format: 'date-time' }) // ✅ Correction ici
        })
      }),
      400: Type.Object({
        success: Type.Literal(false),
        message: Type.String()
      })
    }
  };
  

export const deleteInterventionSchema = {
    tags: ['Intervention : delete Intervention'],

  params: Type.Object({
    id: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      message: Type.String()
    })
  }
};
