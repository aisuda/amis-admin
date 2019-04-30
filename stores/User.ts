import {
    types,
    getEnv
} from "mobx-state-tree";

export const User = types
    .model('User', {
        name: ''
    })
    .views((self) => ({
        get isAuthenticated() {
            return !!self.name;
        }
    }))
    .actions((self) => {
        return {
            login(username:string) {
                localStorage.setItem('authenticated', username);
                self.name = username;
            },
            logout() {
                self.name = '';
            },
            afterCreate() {
                self.name = localStorage.getItem('authenticated') || '';
            }
        }
    });