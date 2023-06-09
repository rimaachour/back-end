const Notification = require('./model')

const getLatestNotifications = async (req, res, next) => {

  const  companyId  =req.params.id;
    try {
      // if (req.local.type !== 'company') {
      //   throw new Error('You are not authorized to see offers');
      // }
    const notifications = await Notification.findAll({
      where: {  companyId : companyId }, // Filter by companyId
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      limit: 10, // Retrieve only 10 notifications
    });

    res.json({ notifications });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLatestNotifications };
