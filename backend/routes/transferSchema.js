import zod from "zod";
const transfer = zod.object({
  to:String,
  amount:Number
}) 
export default transfer
