import { commonHandlers } from "./common";
import { customerHandlers } from "./customer";
import { employeeHandlers } from "./employee";

export const handlers = [...employeeHandlers, ...customerHandlers, ...commonHandlers];
