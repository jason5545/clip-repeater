declare namespace NodeJS {
  interface Timeout {
    _idleTimeout: number;
    _idlePrev: any;
    _idleNext: any;
    _idleStart: number;
    _onTimeout: () => void;
    _timerArgs: any;
    _repeat: boolean;
    _destroyed: boolean;
    refresh(): this;
    unref(): this;
    ref(): this;
  }
} 