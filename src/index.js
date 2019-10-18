import "./style.css";
import { devineLog } from "./js/utility/helpers";

devineLog("Hey, ik ben een JS file");
const arr = [1 , 2,  3];

const ES6Stuff = () => devineLog("Ik kan ES6 stuff aan", ...arr);
ES6Stuff();
