import zod from "zod";
const signupSchema = zod.object({
  username:zod.string(),
  firstName:zod:string(),
  lastName:zod.string(),
  password:zod.string()
});
export default signupSchema;

