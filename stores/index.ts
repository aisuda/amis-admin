import {
    types,
    getEnv
} from "mobx-state-tree";
import { User } from "./User";
export const MainStore = types
    .model('MainStore', {
        theme: 'default',
        user: types.optional(User, {}),
        asideFixed: true,
        asideFolded: false,
        offScreen: false
    })
    .views((self) => ({
        get fetcher() {
            return getEnv(self).fetcher
        },
        get notify() {
            return getEnv(self).notify
        },
        get alert() {
            return getEnv(self).alert
        },
        get copy() {
            return getEnv(self).copy
        }
    }))
    .actions((self) => {
        function toggleAsideFolded() {
            self.asideFolded = !self.asideFolded;
            localStorage.setItem('asideFolded', self.asideFolded ? '1' : '')
        }

        function toggleAsideFixed() {
            self.asideFixed = !self.asideFixed;
        }

        function toggleOffScreen() {
            self.offScreen = !self.offScreen;
        }

        return {
            toggleAsideFolded,
            toggleAsideFixed,
            toggleOffScreen,
            afterCreate: function() {
                self.asideFolded = !!localStorage.getItem('asideFolded');
            }
        };
    });


export type IMainStore = typeof MainStore.Type;