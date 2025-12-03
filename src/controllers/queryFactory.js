const APIFeatures = require('../utils/apiFeatures');

const getOneAsync = (Model, popOptions) =>
    async (req) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);

        const doc = await query;

        return doc;
    };

const getAllAsync = (Model) =>
    async (req) => {
        let filter = {};
        if (req.user) filter = { user: req.user.id };

        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .fields()
            .paginate();

        const docs = await features.query;

        return docs;
    };

const createOneAsync = (Model) =>
    async (req) => {
        const createdDoc = await Model.create(req.body);

        return createdDoc;
    };

const updateOneAsync = (Model) =>
    async (req) => {
        const updatedDoc = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        return updatedDoc;
    };

const deleteOneAsync = (Model) =>
    async (req) => {
        const deletedDoc = await Model.findByIdAndDelete(req.params.id);

        return deletedDoc
    };

module.exports = {
    getOneAsync,
    getAllAsync,
    createOneAsync,
    updateOneAsync,
    deleteOneAsync
};
