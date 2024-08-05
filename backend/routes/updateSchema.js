import zod from "zod";
const updateSchema = zod.object({
  password:zod.string().optional(),
  firstName:zod.string().optional(),
  lastName:zod.string().optional()
})
export default updateSchema;

