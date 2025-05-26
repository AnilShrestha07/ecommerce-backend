const OrderModel = require("./order.model")

class OrderService{
    orderStore = async(data)=>{
        try {
            const orderObj = new OrderModel(data);
            return await orderObj.save()
        } catch (exception) {
            throw exception
        }
    };

    getAllOrderByFilter = async (filter, query={})=>{
        try {
            const page = +query.page ||1;
            const limit = +query.limit || 10;
            let skip = (page-1) * limit;
            const orders = await OrderModel.find(filter)
                .populate('buyer', ['_id','name','email','phone','address','image'] )
                .populate('createdBy', ['_id','name','email','phone','address','image'] )
                .populate('updatedBy', ['_id','name','email','phone','address','image'] )


                .sort({createdAt: "desc"})
                .limit(limit)
                .skip(skip);
            const count = await OrderModel.countDocuments(filter);

            return{
                result : orders,
                pagination: {
                    page: page,
                    limit:limit,
                    total:count,
                },
            }
        } catch (exception) {
            throw exception
        }
    };
    getSingleOrderByFilter = async (filter)=>{
        try {
            const orderInfo = await OrderModel.findOne(filter)
             .populate('buyer', ['_id','name','email','phone','address','image'] )
                .populate('createdBy', ['_id','name','email','phone','address','image'] )
                .populate('updatedBy', ['_id','name','email','phone','address','image'] )
            return orderInfo
        } catch (exception) {
            throw exception
        }
    }
}

const orderSvc = new OrderService()
module.exports = orderSvc 