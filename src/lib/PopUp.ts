import type { member } from "./types";

export class PopUp{
    members: member[];
    isOn:boolean;
    /**
     * @param {member[]} members
     * @param {Boolean} isOn
     */
    constructor(members: member[],isOn:boolean){
        this.members = members
        this.isOn = isOn
    }
}

