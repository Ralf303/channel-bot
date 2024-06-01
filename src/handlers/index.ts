import { Composer } from "telegraf";
import inviteHandler from "./invite.handler";
import adminHandler from "./admin.handler";
import { CustomContext } from "../core/context.interface";
import commandHandler from "./command.handler";

const handlers = new Composer<CustomContext>();

handlers.use(inviteHandler);
handlers.use(adminHandler);
handlers.use(commandHandler);

export default handlers;
