export const appRegistry = {
    obj: {},
    register(key, obj) {
      if (!obj) throw Error("requires config object");
      this.obj[key] = obj;
    },
    getObject(key) {
      return this.obj[key];
    }
  };