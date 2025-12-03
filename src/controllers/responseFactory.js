const responseStatus = require('../utils/responseStatus');
const responseStatusCode = require('../utils/responseStatusCode');

const buildResponseData = (data) => {
    let responseData = null;

    if (data) {
        responseData = {
            data: data
        }
    }
    return {
        responseData
    };
}

const sendSuccessResponse = (res, data = null) => (
    extraProps = {},
    statusCode = responseStatusCode.OK,
    status = responseStatus.SUCCESS
) =>
    res.status(statusCode).json(
        {
            status: status,
            requestedAt: new Date().toISOString(),
            data: buildResponseData(data),
            ...extraProps
        }
    );

const getOneResponse = sendSuccessResponse();

const getAllResponse = (res, data) => 
    sendSuccessResponse(res, data) ( 
        {
            results: data.length,
        }
    );

const createOneResponse = sendSuccessResponse({}, responseStatusCode.CREATED);

const updateOneResponse = sendSuccessResponse();

const deleteOneResponse = sendSuccessResponse({}, responseStatusCode.NO_CONTENT);

module.exports = {
    getOneResponse,
    getAllResponse,
    createOneResponse,
    updateOneResponse,
    deleteOneResponse
};