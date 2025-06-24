import { client } from '..';
import type { B, R } from "../model";

export class AuthServices {

  //**************************************************** GET *****************************************************/
  getUser=                  () =>                       client.get("/auth/user");

  //**************************************************** POST *****************************************************/
  login=                    (data: B): R =>             client.post("/auth/login", data, undefined, { ignoreAuth: true });
  register=                 (data: B) =>                client.post("/auth/register", data, undefined, { ignoreAuth: true });
  logout=                   () =>                       client.post("/auth/logout");

  //**************************************************** PUT *****************************************************/
  updateUser=               (data: B) =>                client.put("/auth/user", data);

  //**************************************************** PATCH ***************************************************/

  //**************************************************** DELETE ***************************************************/
  deleteUser=               () =>                       client.delete("/auth/user");
};

