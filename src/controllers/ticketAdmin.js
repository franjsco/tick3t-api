import moment from 'moment';

import ticketModel from '../models/tickets';

export const getAll = (req, res, next) => {
  const { page, status, id } = req.query;

  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (id) {
    filter.ticketId = id;
  }

  const options = {
    limit: 5,
    page: Number.parseInt(page, 10) || 1,
    sort: { created: -1 },
  };


  ticketModel.paginate(filter, options, (err, result) => {
    if (err) {
      next(err);
    }
    if (result.docs.length) {
      res.json({
        status: 'success',
        message: 'Tickets found',
        currentPage: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        totalDocs: result.totalDocs,
        data: result.docs,
      });
    } else {
      res.json({
        success: false,
        message: 'Tickets not found',
      });
    }
  });
};

export const updateById = (req, res, next) => {
  const { ticketId } = req.params;
  ticketModel.findOneAndUpdate({ ticketId }, req.body, { new: true }, (err, ticket) => {
    if (err) {
      next(err);
    }
    res.json({
      status: 'success',
      message: 'Ticket updated',
      data: ticket,
    });
  });
};

export const deleteById = (req, res, next) => {
  ticketModel.findByIdAndRemove(req.params.ticketId, (err, ticket) => {
    if (err) {
      next(err);
    }
    res.json({
      status: 'success',
      message: 'Ticket deleted',
      data: null,
    });
  });
};
