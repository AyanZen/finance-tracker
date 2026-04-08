import Transaction from "../models/transaction.model.js";

export const addTransction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date
        })

        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
            data: transaction,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`
        })
    }
}


export const getTransantion = async(req, res) => {
    try {
        const { month, category, sort , page = 1, limit = 10 } = req.query;

        let query = { user: req.user._id };
        
        if(month){
            const start = new Date(`${month}-01`);

            if(isNaN(start)){
                return res.status(400).json({
                    success: false,
                    message: "Invalid month format. Use YYYY-MM",
                });
            }

            const end = new Date(start);
            end.setMonth(end.getMonth() + 1);

            query.date = {$gte: start, $lt: end };
        }

        if(category){
            query.category = { $regex: `^${category}$`, $option: "1" };
        }
        let sortOption = { date: -1};
        
        if(sort == "high") sortOption.amount = -1;
        if(sort == "low") sortOption.amount = 1;

        const transaction = await Transaction.find(query)
            .sort(sortOption).limit(Number(limit))
            .skip((Number(page)-1) * Number(limit))

        res.json({
            success: true,
            message: "Transaction fetched successfully",
            data: transaction,
        });    

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Internal Server Error: ${error.message}`
        })
    }
}



export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

   
    if (!transaction || transaction.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found or not authorized",
      });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      message: "Transaction deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};