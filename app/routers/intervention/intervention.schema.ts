import { Type } from '@sinclair/typebox';
import { InterventionStatus } from '@prisma/client';

const interventionReportSchema = Type.Object({
  id: Type.Number(),
  interventionId: Type.Number(),
  title: Type.String(),
  description: Type.String(),
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
});


export const createInterventionSchema = {
  tags: ['Intervention : Create intervention'],
  body: Type.Object({
    idMaintainer: Type.Number(),
    idDispositive: Type.Number(),
    description: Type.String(),
    type: Type.String(),
    status: Type.Enum(InterventionStatus, { default: 'pending' }),
    end_date: Type.String({ format: 'date-time' }), 
    start_date: Type.Optional(Type.String({ format: 'date-time' }))
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
        end_date: Type.String({ format: 'date-time' }),
        start_date: Type.String({ format: 'date-time' }),
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' }),
        report: interventionReportSchema
      })
    })
  }
};

// Schéma pour la mise à jour du rapport
export const updateInterventionReportSchema = {
  tags: ['Intervention : Update Intervention Report'],
  params: Type.Object({
    id: Type.String()
  }),
  body: Type.Object({
    title: Type.String(),
    description: Type.String()
  }),
  response: {
    200: Type.Object({
      success: Type.Literal(true),
      data: interventionReportSchema
    }),
    404: Type.Object({
      success: Type.Literal(false),
      message: Type.String()
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
          end_date: Type.String({ format: 'date-time' }), 
          start_date: Type.String({ format: 'date-time' }),
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' }),  
          report: interventionReportSchema

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
        end_date: Type.String({ format: 'date-time' }), 
        start_date: Type.String({ format: 'date-time' }) ,
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' }),
        report: interventionReportSchema

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
            end_date: Type.String({ format: 'date-time' }), 
            start_date: Type.String({ format: 'date-time' }),
            created_at: Type.String({ format: 'date-time' }),
            updated_at: Type.String({ format: 'date-time' }),    
            report: interventionReportSchema

          })
        )
      }),
      404: Type.Object({
        success: Type.Literal(false),
        message: Type.String()
      })
    }
  };  

export const getInterventionsByidDeviceSchema = {
    tags: ['Intervention : get device interventions'],

    params: Type.Object({
      idDispositive: Type.String()
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
            end_date: Type.String({ format: 'date-time' }), 
            start_date: Type.String({ format: 'date-time' }),
            created_at: Type.String({ format: 'date-time' }),
            updated_at: Type.String({ format: 'date-time' }),    
            report: interventionReportSchema

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
      end_date: Type.Optional(Type.String({ format: 'date-time' })), 
      start_date: Type.Optional(Type.String({ format: 'date-time' })),
      report: interventionReportSchema
 
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
        end_date: Type.String({ format: 'date-time' }), 
        start_date: Type.String({ format: 'date-time' }) ,
        created_at: Type.String({ format: 'date-time' }),
        updated_at: Type.String({ format: 'date-time' }),
        report: interventionReportSchema

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
          end_date: Type.String({ format: 'date-time' }),
          start_date: Type.String({ format: 'date-time' }) ,
          created_at: Type.String({ format: 'date-time' }),
          updated_at: Type.String({ format: 'date-time' }),  
          report: interventionReportSchema

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
