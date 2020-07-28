import { User } from "../types/user.types";

export const sortingByMask = ( mask: string, user: User ) : boolean => user.login.includes(mask);

export const sortingByLoginASC = ( users: User[] ) => {
    // @ts-ignore
    return [...users].sort( ( { login: login1 } : string, { login: login2 } : string ) => {
        let fa = login1.toLowerCase(),
            fb = login2.toLowerCase();

        if (fa < fb) {
            return -1;
        }
        if (fa > fb) {
            return 1;
        }
        return 0;
    });
}