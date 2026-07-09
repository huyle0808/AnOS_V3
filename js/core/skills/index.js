import { greeting } from "./greeting.js";
import { weather } from "./weather.js";
import { whoami } from "./whoami.js";
import { thanks } from "./thanks.js";
import { remember } from "./remember.js";
import { teach } from "./teach.js";
import { history } from "./history.js";
import { profile } from "./profile.js";
import { contextSkill } from "./context.js";
import { calculator } from "./calculator.js";
import { reason } from "./reason.js";
import { fallback } from "./fallback.js";

export const skills = [
    greeting,
    weather,
    whoami,
    thanks,
    remember,
    teach,
    profile,
    reason,      // <-- thêm dòng này
    history,
    contextSkill,
    calculator,
    fallback
];