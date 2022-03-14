import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from 'src/config/storage_Keys.config';
import { Cart } from 'src/models/cart';
import { LocalUser } from 'src/models/Local_user';

@Injectable()
export class StorageService {
    getLocalUser(): LocalUser{
        // eslint-disable-next-line prefer-const
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);

        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart(): Cart{
        // eslint-disable-next-line prefer-const
        let usr = localStorage.getItem(STORAGE_KEYS.cart);

        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    setCart(obj: Cart) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }
}
