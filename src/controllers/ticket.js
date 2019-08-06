import TicketModel from '../models/ticket';


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
    sort: { createdAt: -1 },
  };


  TicketModel.paginate(filter, options, (err, result) => {
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
  TicketModel.findOneAndUpdate({ ticketId }, req.body, { new: true }, (err, ticket) => {
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
  TicketModel.findByIdAndRemove(req.params.ticketId, (err, ticket) => {
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


export const getById = (req, res, next) => {
  const { ticketId } = req.params;

  TicketModel.findOne({ ticketId }, (err, ticketInfo) => {
    if (err) {
      next(err);
    }

    if (ticketInfo) {
      res.json({
        success: true,
        message: 'Ticket Found',
        data: ticketInfo,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'Ticket Not Found',
      });
    }
  });
};


export const create = (req, res, next) => {
  const generatedTicketId = Math.random().toString(36).substr(2, 9);

  const ticketMod = new TicketModel({
    ticketId: generatedTicketId,
    status: 'open',
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    type: req.body.type,
    subject: req.body.subject,
    message: req.body.message,
  });

  ticketMod.save((err, ticket) => {
    if (err) {
      next(err);
      return;
    }

    res.json({
      success: true,
      message: 'Ticket added',
      data: {
        ticketId: generatedTicketId,
      },
    });
  });
};
