import { Subject } from 'rxjs';

class SharedService {
    static networkChanged = new Subject();
    static isUnauthorised = new Subject();
    static isNotificationOpened = new Subject();
}

export default SharedService;
