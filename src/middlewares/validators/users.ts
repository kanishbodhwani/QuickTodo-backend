import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';
import { AUTH_STEPS, GENDER } from '../../constants';

export const createOrUpdateUser: RequestHandler = async (req, res, next) => {
  // Define the common part of the schema
  const commonSchema = Joi.object().strict(true).keys({
    bio: Joi.string().optional()
  });

  // Define separate schemas for each step
  const step1Schema = commonSchema.keys({
    phone_number: Joi.string()
      .pattern(new RegExp('^[0-9]{10}$'))
      .required()
      .messages({
        'string.empty': 'Phone number is required',
        'string.pattern.base': 'Phone number must be a valid 10 digit number'
      }),
    access_token: Joi.string().required().messages({
      'string.empty': 'Access token is required'
    })
  });

  const step2Schema = commonSchema.keys({
    dob: Joi.date().required().messages({
      'date.base': 'Date of birth must be a valid date'
    })
  });

  const step3Schema = commonSchema.keys({
    gender: Joi.string().valid(GENDER).required().messages({
      'string.valid.base': 'Gender should be Male, Female, or Others'
    })
  });

  const step4Schema = commonSchema.keys({
    // Random or default values for username and profile picture
    username: Joi.string().optional().default('default_user'),
    display_picture: Joi.string().optional().default('default.jpg')
  });

  const step5Schema = commonSchema.keys({
    location: Joi.object()
      .keys({
        geo_hash: Joi.string().required().messages({
          'string.empty': 'Geo hash is required'
        }),
        latitude: Joi.number().required().messages({
          'number.base': 'Latitude must be a number'
        }),
        longitude: Joi.number().required().messages({
          'number.base': 'Longitude must be a number'
        })
      })
      .required()
  });

  try {
    const step = req.body.step as string;
    let schema;

    if (step === AUTH_STEPS.phone_verification) {
      schema = step1Schema;
    } else if (step === AUTH_STEPS.dob) {
      schema = step2Schema;
    } else if (step === AUTH_STEPS.gender) {
      schema = step3Schema;
    } else if (step === AUTH_STEPS.user_info) {
      schema = step4Schema;
    } else if (step === AUTH_STEPS.location) {
      schema = step5Schema;
    } else {
      throw new Error('Invalid step');
    }

    // Validate the request body against the chosen schema
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json(error(err.details[0].message, 400));
  }
};
