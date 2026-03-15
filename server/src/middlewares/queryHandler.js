"use strict"

module.exports = (req, res, next) => {
    // Sequelize için basitleştirilmiş queryHandler
    res.getModelList = async (Model, customWhere = {}, includes = []) => {
        return await Model.findAll({
            where: customWhere,
            include: includes
        });
    };

    res.getModelListDetails = async (Model, customWhere = {}) => {
        const data = await Model.findAll({ where: customWhere });
        return {
            totalRecords: data.length
        };
    };

    next();
}