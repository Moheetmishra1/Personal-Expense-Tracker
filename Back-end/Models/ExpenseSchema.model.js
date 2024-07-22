let {Schema,model, default: mongoose} = require("mongoose")

let ExpenseSchema= Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'userSchema' },
        date: { type: String },
        amount: { type: Number },
        description: { type: String },
        category:{
            type:String,default:"Food"
        }
      }
)

exports.ExpenseSchema = model("expenseSchema",ExpenseSchema);