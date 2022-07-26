const { validationResult } = require('express-validator');

const { HttpError } = require('../models/http-error');

const dayjs = require('dayjs');

const Doctor = require('../models/doctor');
const Appointment = require('../models/appointment');

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    console.log(doctors);
    res.json({
      doctors: doctors.map(doctor => doctor.toObject({ getters: true })),
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addAppointment = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(HttpError);
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { time, userId, doctorId } = req.body;

  const newAppointment = new Appointment({
    time,
    userId,
    doctorId,
  });

  try {
    await newAppointment.save();

    res.status(201).json({
      message: 'Appointment created!',
      appointmentId: newAppointment._id,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAppointments = async (req, res, next) => {
  let appointments;
  try {
    appointments = await Appointment.find({}).populate('doctorId');
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Fetching appointments failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({
    appointments: appointments.map(appointment => {
      const appointmentSeralized = appointment.toObject({ getters: true });
      const appointmentDateTime = dayjs(appointmentSeralized.time);

      return {
        ...appointmentSeralized,
        date: appointmentDateTime.format('DD/MM/YYYY'),
        time: appointmentDateTime.format('h:mm A'),
      };
    }),
  });
};
