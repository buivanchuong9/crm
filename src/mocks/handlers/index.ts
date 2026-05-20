import { commonHandlers } from "./common";
import { customerHandlers } from "./customer";
import { employeeHandlers } from "./employee";
import { bpmHandlers } from "./bpm";

export const handlers = [...bpmHandlers, ...employeeHandlers, ...customerHandlers, ...commonHandlers];
