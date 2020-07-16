import { UIError } from '../types/error';

export interface DBProps<T> {
    onUpdate: () => void;
    initialData: T;
}

export interface TheDB<T> {
    data: T;
}

export enum DBStatus {
    NONE,
    LOADING,
    LOADED,
    RELOADING,
    ERROR
}

export interface DBStateNone {
    status: DBStatus.NONE;
}

export interface DBStateLoading {
    status: DBStatus.LOADING;
}

export interface DBStateReLoading {
    status: DBStatus.RELOADING;
}

export interface DBStateLoaded {
    status: DBStatus.LOADED;
}

export interface DBStateError {
    status: DBStatus.ERROR;
    error: UIError;
}

export default class DB<T> {
    db: TheDB<T>;
    stopped: boolean;
    onUpdate: () => void;
    constructor(props: DBProps<T>) {
        this.onUpdate = props.onUpdate;
        this.db = {
            data: props.initialData
        };
        this.stopped = false;
    }

    forceComponentUpdate() {
        if (this.stopped) {
            return;
        }
        this.onUpdate();
    }

    set(updateFun: (state: T) => T) {
        this.db.data = updateFun(this.db.data);
        this.forceComponentUpdate();
    }

    get(): T {
        return this.db.data;
    }

    stop() {
        this.stopped = true;
    }
}
