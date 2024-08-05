
import zod from "zod";
const signinSchema = zod.object({
  username:zod.string(),
  password:zod.string()
}
